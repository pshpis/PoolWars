using PoolWarsV0.MetadataReader.Core.Models;

namespace PoolWarsV0.MetadataReader.Core.Services;

public interface IMetadataReader
{
    ValueTask<CardMetadata> ReadMetadata(string mintAddress);
}