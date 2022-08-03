using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;

namespace PoolWarsV0.MetadataReader.Core.Services.Implementations;

public class CachedMetadataReader : IMetadataReader
{
    private readonly DatabaseMetadataReader _databaseMetadataReader;
    private readonly SolscanMetadataReader _solscanMetadataReader;

    public CachedMetadataReader(DatabaseMetadataReader databaseMetadataReader, SolscanMetadataReader solscanMetadataReader)
    {
        _databaseMetadataReader = databaseMetadataReader;
        _solscanMetadataReader = solscanMetadataReader;
    }

    public async ValueTask<CardMetadata> ReadMetadata(string mintAddress)
    {
        CardMetadata? metadata = await ReadFromDatabase(mintAddress);

        if (metadata is null)
        {
            metadata = await ReadFromBlockchain(mintAddress) ?? throw new MetadataNotFoundException();
            await CacheMetadata(metadata);
        }

        return metadata;
    }

    private async Task<CardMetadata?> ReadFromDatabase(string mintAddress)
    {
        try
        {
            return await _databaseMetadataReader.ReadMetadata(mintAddress);
        }
        catch (MetadataNotFoundException)
        {
            return null;
        }
    }

    private async Task<CardMetadata?> ReadFromBlockchain(string mintAddress)
    {
        try
        {
            return await _solscanMetadataReader.ReadMetadata(mintAddress);
        }
        catch (MetadataNotFoundException)
        {
            return null;
        }
    }

    private async Task CacheMetadata(CardMetadata metadata)
    {
        try
        {
            await _databaseMetadataReader.AddMetadata(metadata);
        }
        catch (MetadataAddException)
        {
            // Ignore
        }
    }
}