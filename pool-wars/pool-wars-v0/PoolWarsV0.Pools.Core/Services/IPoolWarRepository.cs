using PoolWarsV0.Pools.Core.Models;

namespace PoolWarsV0.Pools.Core.Services;

public interface IPoolWarRepository
{
    Task<PoolWar> StartPoolWarAsync(string description, DateTime end);

    Task<PoolWar> StartPoolWarAsync(DateTime end);

    IAsyncEnumerable<PoolWar> GetPoolWarsAsync();
}