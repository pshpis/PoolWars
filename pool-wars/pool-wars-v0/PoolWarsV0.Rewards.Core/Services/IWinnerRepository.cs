using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Rewards.Core.Models;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IWinnerGenerator
{
    public Task<WinnerData> GetWinnerPool(params Pool[] pools);

    public Task<PoolWarResult> GetPoolWarResult(PoolUserAdapter pool);

    public Task<PoolWarResult> GetPoolWarResult(Pool pool);
}