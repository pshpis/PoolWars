using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.Rewards.Models;

public class TakeCardRequest
{
    [Required]
    public string TransactionMessage { get; set; } = string.Empty;

    [Required]
    public string MessageSignature { get; set; } = string.Empty;

    [Required]
    public string CardMintAddress { get; set; } = string.Empty;

    [Required]
    public string PoolAddress { get; set; } = string.Empty;
}