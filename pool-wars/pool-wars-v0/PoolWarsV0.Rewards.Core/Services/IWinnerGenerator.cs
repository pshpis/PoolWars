using PoolWarsV0.Pools.Core.Models;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IWinnerGenerator
{
    public Task<Pool> GetWinnerPool(params Pool[] pools);
}