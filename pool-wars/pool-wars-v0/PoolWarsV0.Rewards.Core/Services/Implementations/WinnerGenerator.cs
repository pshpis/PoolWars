using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services.Implementations;
using PoolWarsV0.Rewards.Core.Exceptions;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class WinnerGenerator : IWinnerGenerator
{
    private readonly PoolService _poolService;
    private readonly Context _context;

    public WinnerGenerator(PoolService poolService, Context context)
    {
        _poolService = poolService;
        _context = context;
    }

    public async Task<Pool> GetWinnerPool(params Pool[] pools)
    {
        if (pools.Length != 2)
        {
            throw new WinnerGeneratorException("BAD_POOL_COUNT");
        }

        var poolsData = await _context.Pools
            .AsNoTracking()
            .Include(p => p.PoolWar)
            .ThenInclude(p => p.Result)
            .Where(p => pools.Any(p1 => p1.Address == p.Address))
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

        if (poolWar.End < DateTime.UtcNow)
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

        if (pool1Strength.TotalStrength == 0 && pool2Strength.TotalStrength == 0)
        {
            throw new WinnerGeneratorException("POOLS_EMPTY");
        }

        if (Random.Shared.Next(minValue: 0, pool1Strength.TotalStrength + pool2Strength.TotalStrength) >= pool1Strength.TotalStrength)
        {
            winnerPool = pool2Strength;
        }
        else
        {
            winnerPool = pool1Strength;
        }

        return new()
        {
            Address = winnerPool.Address
        };
    }
}