using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services.Implementations;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Models;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class WinnerGenerator : IWinnerGenerator
{
    private readonly Context _context;
    private readonly PoolService _poolService;

    public WinnerGenerator(PoolService poolService, Context context)
    {
        _poolService = poolService;
        _context = context;
    }

    public async Task<WinnerData> GetWinnerPool(params Pool[] pools)
    {
        if (pools.Length != 2)
        {
            throw new WinnerGeneratorException("BAD_POOL_COUNT");
        }

        var poolsData = await _context.Pools
            .AsNoTracking()
            .Include(p => p.PoolWar)
            .ThenInclude(p => p.Result)
            .Where(p => p.Address == pools[0].Address || p.Address == pools[1].Address)
            .ToArrayAsync();

        if (poolsData.Length != 2)
        {
            throw new WinnerGeneratorException("SOME_POOL_NOT_FOUND");
        }

        if (poolsData[0].PoolWarId != poolsData[1].PoolWarId)
        {
            throw new WinnerGeneratorException("POOLS_ERR_NOT_SAME_POOL_WAR");
        }

        PoolWarDao poolWar = poolsData[0].PoolWar;

        if (poolWar.End > DateTime.UtcNow)
        {
            throw new WinnerGeneratorException("POOL_WAR_NOT_ENDED");
        }

        if (poolWar.Result is { })
        {
            throw new WinnerGeneratorException("RESULT_ALREADY_EXISTS");
        }

        PoolState pool1Strength = await _poolService.GetPoolStrengthAsync(poolsData[0].Address, userAddress: null);
        PoolState pool2Strength = await _poolService.GetPoolStrengthAsync(poolsData[1].Address, userAddress: null);
        PoolState winnerPool;
        PoolState loserPool;

        var strengthBorder = (double) pool1Strength.TotalStrength / (pool1Strength.TotalStrength + pool2Strength.TotalStrength);

        if (pool1Strength.TotalStrength == 0 && pool2Strength.TotalStrength == 0)
        {
            throw new WinnerGeneratorException("POOLS_EMPTY");
        }

        if (Random.Shared.NextDouble() >= strengthBorder)
        {
            winnerPool = pool2Strength;
            loserPool = pool1Strength;
        }
        else
        {
            winnerPool = pool1Strength;
            loserPool = pool2Strength;
        }

        return new(
            winnerPool,
            loserPool,
            poolWar.Id
        );
    }

    public async Task<PoolWarResult> GetPoolWarResult(PoolUserAdapter pool)
    {
        ResultUserLink link = await _context.ResultUserLinks
                                  .AsNoTracking()
                                  .Include(l => l.User)
                                  .Include(u => u.Cards)
                                  .ThenInclude(c => c.Card)
                                  .ThenInclude(m => m.CardMint)
                                  .Include(l => l.Result)
                                  .ThenInclude(r => r.PoolWar)
                                  .ThenInclude(w => w.Pools)
                                  .Include(l => l.Result)
                                  .ThenInclude(r => r.WinnerPool)
                                  .FirstOrDefaultAsync(l =>
                                      l.User.Address == pool.User &&
                                      l.Result.PoolWar.Pools.Any(p => p.Address == pool.Address)) ??
                              throw new WinnerGeneratorException("NO_RESULT");

        PoolWarResult result = new()
        {
            Address = link.Result.WinnerPool.Address
        };

        result.Users.Add(new()
        {
            Address = link.User.Address,
            Cards = link.Cards.Select(c => new PoolWarResultCard
            {
                Mint = c.Card.CardMint.Address,
                Metadata = new()
                {
                    Mint = c.Card.CardMint.Address,
                    Strength = c.Card.Strength,
                    Type = c.Card.Type
                }
            }).OrderBy(c => c.Mint).ToList()
        });

        return result;
    }

    public async Task<PoolWarResult> GetPoolWarResult(Pool pool)
    {
        PoolWarResultDao result = await _context.PoolWarsResults
                                      .AsNoTracking()
                                      .Include(r => r.WinnerPool)
                                      .Include(r => r.PoolWar)
                                      .ThenInclude(w => w.Pools)
                                      .FirstOrDefaultAsync(r => r.PoolWar.Pools.Any(p => p.Address == pool.Address)) ??
                                  throw new WinnerGeneratorException("NO_RESULT");

        return new()
        {
            Address = result.WinnerPool.Address
        };
    }
}