using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Table("User")]
[Index(nameof(WalletAddress), IsUnique = true)]
[Index(nameof(AuthToken), IsUnique = true)]
public class PrismaUser
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("wallet_address")]
    public string WalletAddress { get; set; } = string.Empty;

    [Required]
    [Column("auth_token")]
    public string AuthToken { get; set; } = string.Empty;

    [Required]
    [Column("twitter_nickname")]
    public string TwitterNickname { get; set; } = string.Empty;

    [Column("discord_auth_token")]
    public string DiscordAuthToken { get; set; } = string.Empty;

    [Required]
    [Column("auth_code")]
    public string AuthCode { get; set; } = string.Empty;

    [Required]
    [Column("auth_token_created")]
    public DateTime AuthTokenCreated { get; set; } = DateTime.UtcNow;
}