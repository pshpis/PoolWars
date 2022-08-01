using System.ComponentModel.DataAnnotations;
using PoolWarsV0.Data.Models;

namespace PoolWarsV0.MetadataReader.Core.Models;

public class CardMetadata
{
    [Required]
    public int Strength { get; set; }

    [Required]
    public CardType Type { get; set; }

    [Required]
    public string Mint { get; set; } = string.Empty;
}