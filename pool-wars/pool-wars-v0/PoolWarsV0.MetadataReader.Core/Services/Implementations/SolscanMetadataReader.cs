using System.Net.Http.Json;
using System.Text;
using PoolWarsV0.Data.Models;
using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;
using Solana.Metaplex;
using Solnet.Rpc;
using Solnet.Wallet;

namespace PoolWarsV0.MetadataReader.Core.Services.Implementations;

public class SolscanMetadataReader : IMetadataReader
{
    private readonly HttpClient _client;
    private readonly IVerifiedCreatorAssertion _creatorAssertion;
    private readonly IRpcClient _rpcClient;

    public SolscanMetadataReader(IRpcClient rpcClient, HttpClient client, IVerifiedCreatorAssertion creatorAssertion)
    {
        _rpcClient = rpcClient;
        _client = client;
        _creatorAssertion = creatorAssertion;
    }

    public async ValueTask<CardMetadata> ReadMetadata(string mintAddress)
    {
        PublicKey.TryFindProgramAddress(new[]
            {
                Encoding.UTF8.GetBytes("metadata"),
                MetadataProgram.ProgramIdKey.KeyBytes,
                new PublicKey(mintAddress).KeyBytes
            },
            MetadataProgram.ProgramIdKey,
            out PublicKey metadata,
            out _);

        MetadataAccount? account = await MetadataAccount.GetAccount(_rpcClient, metadata);

        if (!account.data.creators[0].verified)
        {
            throw new CreatorAssertionException();
        }

        await _creatorAssertion.AssertCreatorVerifiedAsync(account.data.creators[0].key);

        if (account is null)
        {
            throw new MetadataNotFoundException();
        }

        var mint = account.mint;

        var uri = new string(account.data.uri.TakeWhile(c => c != 0).ToArray());
        HttpResponseMessage response = await _client.GetAsync(uri);

        CardAttributeWrapper? data = await response.Content.ReadFromJsonAsync<CardAttributeWrapper>();

        if (data is null)
        {
            throw new MetadataNotFoundException();
        }

        var attributes = data.Attributes;

        return new()
        {
            Mint = mint,
            Type = attributes.First(a => a.TraitType == "Type").Value switch
            {
                "Intelligence" => CardType.Intelligence,
                "Attack" => CardType.Attack,
                "Defence" => CardType.Defence,
                _ => throw new NullReferenceException()
            },
            Strength = int.Parse(attributes.First(a => a.TraitType == "Strength").Value)
        };
    }
}