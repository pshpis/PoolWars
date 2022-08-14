using System.Text;
using PoolWarsV0.Rewards.Core.Models;
using Solana.Metaplex;
using Solnet.Programs;
using Solnet.Rpc;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class CardParser : ICardParser
{
    private readonly IRpcClient _client;

    public CardParser(IRpcClient client)
    {
        _client = client;
    }

    public async Task<CardsData> GetWalletCards(PublicKey wallet)
    {
        var accounts = await _client.GetTokenAccountsByOwnerAsync(
            wallet,
            tokenProgramId:
            TokenProgram.ProgramIdKey
        );

        var metadatas = accounts.Result.Value.Where(v =>
                v.Account.Data.Parsed.Info.TokenAmount.Decimals == 0 &&
                v.Account.Data.Parsed.Info.TokenAmount.AmountUlong == 1)
            .Select(v => v.Account.Data.Parsed.Info.Mint)
            .Select(MintToMetadata)
            .ToList();

        var cardCount =
            await GetAmountByCreator(metadatas, new("HQqpHR1DE7o8qorjDanWFedxi5bH9rmyQksfLKYkZfZq")) +
            await GetAmountByCreator(metadatas, new("CSLxsmLw7ncjUEQuKJ5nU3wZDzcLToz58kFRa4ksXP3y")) +
            await GetAmountByCreator(metadatas, new("DKWyMS4WHUXL1ybtWAZ6wyJbCqV6fDyTBsfN1b3vVVTo"));

        var legendaryCount = await GetAmountByCreator(metadatas, new("G2QdN1QPdGRk1DPmjufrjLsgBpBNzyRSfPAr8dEC3DB4"));

        return new()
        {
            CardCount = cardCount,
            LegendaryCardCount = legendaryCount
        };
    }

    private async Task<int> GetAmountByCreator(IEnumerable<PublicKey> metadatas, PublicKey creator)
    {
        var amount = 0;

        foreach (PublicKey metadata in metadatas)
        {
            try
            {
                MetadataAccount? account = await MetadataAccount.GetAccount(_client, metadata);

                if (account != null &&
                    account.data.creators[0].verified &&
                    account.data.creators[0].key == creator)
                {
                    amount += 1;
                }
            }
            catch (Exception)
            {
                //
            }
        }

        return amount;
    }

    private static PublicKey MintToMetadata(string mint)
    {
        PublicKey mintAddress = new(mint);

        PublicKey.TryFindProgramAddress(new[]
            {
                Encoding.UTF8.GetBytes("metadata"),
                MetadataProgram.ProgramIdKey.KeyBytes,
                mintAddress.KeyBytes
            },
            MetadataProgram.ProgramIdKey,
            out PublicKey address,
            out _
        );

        return address;
    }
}