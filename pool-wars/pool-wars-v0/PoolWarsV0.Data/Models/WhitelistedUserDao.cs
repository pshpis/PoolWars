using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(StageId), IsUnique = false)]
[Index(nameof(UserId), IsUnique = true)]
public class WhitelistedUserDao
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(Stage))]
    public int StageId { get; set; }

    [Required]
    public MintStageDao Stage { get; set; } = null!;

    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    [Required]
    public PoolUserDao User { get; set; } = null!;

    [Required]
    public int MintedAmount { get; set; }

    [Required]
    public int CanMintTotal { get; set; }
}