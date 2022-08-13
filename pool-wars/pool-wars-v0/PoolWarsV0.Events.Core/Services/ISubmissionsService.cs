using Solnet.Wallet;

namespace PoolWarsV0.Events.Core.Services;

public interface ISubmissionsService
{
    Task SubmitWallet(PublicKey wallet, string discordId);

    Task<bool> Status(PublicKey wallet);
}