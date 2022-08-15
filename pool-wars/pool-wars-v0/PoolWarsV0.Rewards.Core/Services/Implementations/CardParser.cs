using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.MetadataReader.Core.Services;
using PoolWarsV0.Rewards.Core.Models;
using Solnet.Programs;
using Solnet.Rpc;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class CardParser : ICardParser
{
    private readonly IRpcClient _client;
    private readonly IMetadataReader _metadataReader;

    public CardParser(IRpcClient client, IMetadataReader metadataReader)
    {
        _client = client;
        _metadataReader = metadataReader;
    }

    public async Task<CardsData> GetWalletCards(PublicKey wallet)
    {
        var accounts = await _client.GetTokenAccountsByOwnerAsync(
            wallet,
            tokenProgramId:
            TokenProgram.ProgramIdKey
        );

        var mints = accounts.Result.Value.Where(v =>
                v.Account.Data.Parsed.Info.TokenAmount.Decimals == 0 &&
                v.Account.Data.Parsed.Info.TokenAmount.AmountUlong == 1)
            .Select(v => v.Account.Data.Parsed.Info.Mint)
            .ToList();

        CardsData data = new();

        foreach (var mint in mints)
        {
            try
            {
                CardMetadata metadata = await _metadataReader.ReadMetadata(mint);

                if (metadata.Strength >= 12)
                {
                    data.LegendaryCardCount += 1;
                }
                else
                {
                    data.CardCount += 1;
                }
            }
            catch (MetadataNotFoundException)
            {
                //
            }
            catch (CreatorAssertionException)
            {
                //
            }
        }

        return data;
    }
}