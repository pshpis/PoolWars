using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Events.Core.Exceptions;
using PoolWarsV0.Events.Core.Models;
using PoolWarsV0.Events.Core.Services;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Models;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class RewardDistributor : IRewardDistributor
{
    private readonly Context _context;
    private readonly IEventRepository _repository;

    public RewardDistributor(Context context, IEventRepository repository)
    {
        _context = context;
        _repository = repository;
    }

    public async Task<PoolWarResult> DistributeRewards(WinnerData winner)
    {
        PoolWarDao poolWarDao = await _context.PoolWars
                                    .AsTracking()
                                    .Include(w => w.Pools)
                                    .ThenInclude(p => p.Deposits)
                                    .ThenInclude(d => d.CardMetadata)
                                    .ThenInclude(m => m.CardMint)
                                    .Include(w => w.Pools)
                                    .ThenInclude(p => p.Deposits)
                                    .ThenInclude(d => d.User)
                                    .Include(w => w.Result)
                                    .FirstOrDefaultAsync(w => w.Id == winner.PoolWarId) ??
                                throw new WinnerGeneratorException("POOL_WAR_NOT_FOUND");

        if (poolWarDao.Result is { })
        {
            throw new WinnerGeneratorException("POOL_WAR_RESULT_ALREADY_EXISTS");
        }

        PoolDao winnerPool = poolWarDao.Pools.FirstOrDefault(p => p.Address == winner.WinnerPool.Address) ??
                             throw new WinnerGeneratorException("POOL_NOT_FOUND");

        PoolDao loserPool = poolWarDao.Pools.FirstOrDefault(p => p.Address == winner.LoserPool.Address) ??
                            throw new WinnerGeneratorException("POOL_NOT_FOUND");

        var winnerDeposits = GetPoolCards(winnerPool)
            .OrderByDescending(m => m.Strength)
            .ToList();

        var loserDeposits = GetPoolCards(loserPool)
            .OrderByDescending(m => m.Strength)
            .ToList();

        var toDistribute = winnerDeposits.Concat(loserDeposits).ToList();

        var rewardedUsers = GetPoolUsers(winnerPool);

        PoolWarResultDao result = new()
        {
            PoolWar = poolWarDao,
            WinnerPool = winnerPool,
            PoolWarId = poolWarDao.Id,
            WinnerPoolId = winnerPool.Id
        };

        await using IDbContextTransaction transaction = await _context.Database.BeginTransactionAsync();

        foreach (PoolUserDao user in rewardedUsers)
        {
            PoolWarEvent @event = new(user.Address);

            ResultUserLink resultUserLink = new()
            {
                User = user,
                UserId = user.Id,
                Result = result
            };

            AddUserShareToReward(resultUserLink, user, winner.WinnerPool, winnerPool, winner.LoserPool, ref toDistribute);
            @event.Cards = resultUserLink.Cards.Select(c => c.Card.CardMint.Address).ToList();

            try
            {
                await _repository.AddEventAsync(@event);
            }
            catch (EventRepositoryException e)
            {
                throw new WinnerGeneratorException(e.Message);
            }

            result.Users.Add(resultUserLink);
        }

        poolWarDao.Result = result;
        _context.PoolWars.Update(poolWarDao);
        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        return new()
        {
            Address = winner.WinnerPool.Address,
            Users = result.Users.Select(u => new PoolWarResultUser
            {
                Address = u.User.Address,
                Cards = u.Cards.Select(c => new PoolWarResultCard
                {
                    Mint = c.Card.CardMint.Address,
                    Metadata = new()
                    {
                        Mint = c.Card.CardMint.Address,
                        Strength = c.Card.Strength,
                        Type = c.Card.Type
                    }
                }).OrderBy(c => c.Mint).ToList()
            }).OrderBy(u => u.Address).ToList()
        };
    }

    private static IEnumerable<CardMetadataDao> GetPoolCards(PoolDao pool)
    {
        return pool.Deposits.Select(d => d.CardMetadata);
    }

    private static IEnumerable<PoolUserDao> GetPoolUsers(PoolDao pool)
    {
        Dictionary<string, PoolUserDao> users = new();

        foreach (PoolDepositDao deposit in pool.Deposits)
        {
            if (!users.ContainsKey(deposit.User.Address))
            {
                users.Add(deposit.User.Address, deposit.User);
            }
        }

        return users.Values.OrderBy(u => u.Address).ToList();
    }

    private static int GetUserStrength(PoolUserDao user, PoolDao pool)
    {
        return user.Deposits.Where(d => d.PoolId == pool.Id).Sum(d => d.CardMetadata.Strength);
    }

    private static void AddUserShareToReward(ResultUserLink resultUserLink,
        PoolUserDao user,
        PoolState winnerPool,
        PoolDao winnerPoolDao,
        PoolState loserPool,
        ref List<CardMetadataDao> toDistribute)
    {
        var userStrength = GetUserStrength(user, winnerPoolDao);

        var userRewardStrength = (int) Math.Floor(userStrength + // Give user his equivalent of deposit back
                                                  (double) userStrength *
                                                  loserPool.TotalStrength / // And add his share in loser pool
                                                  winnerPool.TotalStrength
        );

        while (userRewardStrength > 0)
        {
            CardMetadataDao? metadata = toDistribute.FirstOrDefault(d => userRewardStrength >= d.Strength);

            if (metadata is null)
            {
                // TODO: Assign from admin wallet
                break;
            }

            userRewardStrength -= metadata.Strength;

            resultUserLink.Cards.Add(new()
            {
                CardId = metadata.Id,
                Card = metadata,
                Link = resultUserLink
            });

            toDistribute.Remove(metadata);
        }
    }
}