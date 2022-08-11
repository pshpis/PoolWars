using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(UserId), IsUnique = false)]
[Index(nameof(PoolId), nameof(CardMetadataId), IsUnique = true)]
public class PoolDepositDao
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    [Required]
    public PoolUserDao User { get; set; } = null!;

    [Required]
    [ForeignKey(nameof(Pool))]
    public int PoolId { get; set; }

    [Required]
    public PoolDao Pool { get; set; } = null!;

    [Required]
    [ForeignKey(nameof(CardMetadata))]
    public int CardMetadataId { get; set; }

    [Required]
    public CardMetadataDao CardMetadata { get; set; } = null!;
}