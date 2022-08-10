using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Models;
using Solnet.Rpc.Models;

namespace PoolWarsV0.Pools.Core.Services.Implementations;

public class PoolService : IPoolService
{
    private readonly ITransactionAssertionService _assertionService;
    private readonly Context _context;
    private readonly ITransactionSender _transactionSender;

    public PoolService(Context context, ITransactionAssertionService assertionService, ITransactionSender transactionSender)
    {
        _context = context;
        _assertionService = assertionService;
        _transactionSender = transactionSender;
    }

    public async Task<PoolState> GetPoolStrengthAsync(string address, string? userAddress)
    {
        PoolDao poolDao = await _context.Pools.AsNoTracking()
                              .FirstOrDefaultAsync(p => p.Address == address) ??
                          throw new PoolServiceException();

        var poolId = poolDao.Id;

        var totalStrength = await _context.Deposits
            .AsNoTracking()
            .Include(d => d.CardMetadata)
            .Where(d => d.PoolId == poolId)
            .SumAsync(d => d.CardMetadata.Strength);

        PoolState state = new()
        {
            Address = poolDao.Address,
            TotalStrength = totalStrength,
            UserStrength = 0
        };

        if (userAddress is not null)
        {
            PoolUserDao? userDao = await _context.PoolUsers.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Address == userAddress);

            if (userDao is null)
            {
                return state;
            }

            var userId = userDao.Id;

            var userStrength = await _context.Deposits
                .AsNoTracking()
                .Include(d => d.CardMetadata)
                .Where(d => d.PoolId == poolId && d.UserId == userId)
                .SumAsync(d => d.CardMetadata.Strength);

            state.UserStrength = userStrength;
        }

        return state;
    }

    public async Task<PoolState> DepositCardAsync(CardMetadata metadata, Pool pool, Message signCardMessage, byte[] signature)
    {
        PoolDao poolDao = await _context.Pools
                              .AsNoTracking()
                              .Include(p => p.PoolWar)
                              .FirstOrDefaultAsync(p => p.Address == pool.Address) ??
                          throw new PoolServiceException("POOL_NOT_FOUND");

        CardMetadataDao cardMetadataDao = await _context.CardMetadata
                                              .AsNoTracking()
                                              .Include(c => c.CardMint)
                                              .FirstOrDefaultAsync(c => c.CardMint.Address == metadata.Mint) ??
                                          new CardMetadataDao
                                          {
                                              CardMint = new()
                                              {
                                                  Address = metadata.Mint
                                              },
                                              Strength = metadata.Strength,
                                              Type = metadata.Type
                                          };

        if (poolDao.PoolWar.End < DateTime.UtcNow)
        {
            throw new PoolServiceException("POOL_WAR_ENDED");
        }

        PoolUserAdapter poolAdapter = _assertionService.AssertMessageValid(signCardMessage, metadata, pool);

        PoolUserDao userDao = await _context.PoolUsers
                                  .AsNoTracking()
                                  .Include(u => u.Deposits)
                                  .ThenInclude(d => d.CardMetadata)
                                  .FirstOrDefaultAsync(u => u.Address == poolAdapter.User) ??
                              new PoolUserDao
                              {
                                  Address = poolAdapter.User,
                                  Deposits = new List<PoolDepositDao>()
                              };

        PoolDepositDao deposit = new()
        {
            PoolId = poolDao.Id,
            Pool = poolDao,
            CardMetadataId = cardMetadataDao.Id,
            CardMetadata = cardMetadataDao,
            UserId = userDao.Id,
            User = userDao

        };

        userDao.Deposits.Add(deposit);

        Transaction tx = Transaction.Populate(signCardMessage, new[] {signature});
        await using IDbContextTransaction dbTx = await _context.Database.BeginTransactionAsync();

        try
        {
            _context.PoolUsers.Update(userDao);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            throw new PoolServiceException("DB_UPDATE_ERROR");
        }

        await _transactionSender.Send(tx);
        await dbTx.CommitAsync();

        // Set card metadata after transaction commits to return proper values
        deposit.CardMetadata = cardMetadataDao;

        return new()
        {
            Address = poolAdapter.Address,
            TotalStrength = deposit.Pool.Deposits.Sum(d => d.CardMetadata.Strength),

            UserStrength = deposit.Pool.Deposits
                .Where(d => d.UserId == deposit.UserId)
                .Sum(d => d.CardMetadata.Strength)
        };
    }
}