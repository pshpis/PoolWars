using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

public enum CardType
{
    Attack,
    Defence,
    Intelligence
}

[Index(nameof(CardMintId), IsUnique = true)]
public class CardMetadataDao
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int Strength { get; set; }

    [Required]
    public CardType Type { get; set; }

    [Required]
    [ForeignKey(nameof(CardMint))]
    public int CardMintId { get; set; }

    [Required]
    public CardMintAddress CardMint { get; set; } = null!;
}