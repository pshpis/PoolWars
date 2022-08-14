using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IWhitelistGiver
{
    Task GiveSpotsToWallet(PublicKey wallet);
}