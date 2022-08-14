using PoolWarsV0.Rewards.Core.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services;

public interface ICardParser
{
    Task<CardsData> GetWalletCards(PublicKey wallet);
}