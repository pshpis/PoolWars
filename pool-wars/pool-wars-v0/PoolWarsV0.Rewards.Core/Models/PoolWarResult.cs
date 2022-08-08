using PoolWarsV0.Pools.Core.Models;

namespace PoolWarsV0.Rewards.Core.Models;

public class PoolWarResult : Pool
{
    public ICollection<PoolWarResultUser> Users { get; set; } = new List<PoolWarResultUser>();
}