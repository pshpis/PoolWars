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
    private readonly IRpcClient _rpcClient;
    private readonly HttpClient _client;

    public SolscanMetadataReader(IRpcClient rpcClient, HttpClient client)
    {
        _rpcClient = rpcClient;
        _client = client;
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

        if (account is null)
        {
            throw new MetadataNotFoundException();
        }

        var mint = account.mint;
        CardAttributeWrapper? data = await _client.GetFromJsonAsync<CardAttributeWrapper>(account.data.uri);

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
            Strength = int.Parse(attributes.First(a => a.TraitType == "Type").Value)
        };
    }
}