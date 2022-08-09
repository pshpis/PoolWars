using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services;

public interface ICardTaker
{
    Task TakeCard(Message message, byte[] signature, PublicKey cardMint, PublicKey poolAddress);
}