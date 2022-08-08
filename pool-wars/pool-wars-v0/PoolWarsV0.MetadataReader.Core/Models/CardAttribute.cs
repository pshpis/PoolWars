using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PoolWarsV0.MetadataReader.Core.Models;

public class CardAttribute
{
    [JsonPropertyName("trait_type")]
    [Required]
    public string TraitType { get; set; } = string.Empty;

    [JsonPropertyName("value")]
    [Required]
    public string Value { get; set; } = string.Empty;
}

public class CardAttributeWrapper
{
    [Required]
    [JsonPropertyName("attributes")]
    public CardAttribute[] Attributes { get; set; } = null!;
}