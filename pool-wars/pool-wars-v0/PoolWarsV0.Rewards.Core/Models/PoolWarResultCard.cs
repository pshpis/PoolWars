using PoolWarsV0.MetadataReader.Core.Models;

namespace PoolWarsV0.Rewards.Core.Models;

public class PoolWarResultCard
{
    public string Mint { get; set; } = string.Empty;

    public CardMetadata Metadata { get; set; } = null!;
}