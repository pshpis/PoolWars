using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IMintService
{
    Task MintOne(Message message, byte[] userSignature, byte[] mintAccountSignature, PublicKey userAddress, PublicKey cardMint);
}