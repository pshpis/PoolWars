using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.Rewards.Models;

public class MintRequest
{
    [Required]
    public string TransactionMessage { get; set; } = string.Empty;

    [Required]
    public string MessageSignature { get; set; } = string.Empty;

    [Required]
    public string MintAccountSignature { get; set; } = string.Empty;

    [Required]
    public string WalletAddress { get; set; } = string.Empty;

    [Required]
    public string CardMint { get; set; } = string.Empty;
}