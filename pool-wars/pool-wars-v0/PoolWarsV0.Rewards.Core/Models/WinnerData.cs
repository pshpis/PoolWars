using System.Text.Json.Serialization;
using PoolWarsV0.Pools.Core.Models;

namespace PoolWarsV0.Rewards.Core.Models;

public class WinnerData
{
    public WinnerData(PoolState winnerPool, PoolState loserPool, int poolWarId)
    {
        WinnerPool = winnerPool;
        LoserPool = loserPool;
        PoolWarId = poolWarId;
    }

    public PoolState WinnerPool { get; set; }

    public PoolState LoserPool { get; set; }

    [JsonIgnore]
    public int PoolWarId { get; set; }
}