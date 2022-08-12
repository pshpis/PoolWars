using PoolWarsV0.Rewards.Core.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IStageService
{
    Task<MintStage> GetCurrentStage();
    Task<MintStage> GetWalletStage(PublicKey wallet);
}