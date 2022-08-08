using PoolWarsV0.Rewards.Core.Models;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IRewardDistributor
{
    Task<PoolWarResult> DistributeRewards(WinnerData winner);
}