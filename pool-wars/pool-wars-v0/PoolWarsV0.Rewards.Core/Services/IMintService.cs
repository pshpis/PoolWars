using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services;

public interface IMintService
{
    Task<byte[]> MintOne(Message message, byte[] userSignature, byte[] mintAccountSignature, PublicKey userAddress, PublicKey cardMint);
}