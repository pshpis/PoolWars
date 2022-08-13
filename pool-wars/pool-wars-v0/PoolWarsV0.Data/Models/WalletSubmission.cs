using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(UserId), IsUnique = true)]
public class WalletSubmission
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    public PoolUserDao User { get; set; } = null!;

    [Required]
    public DateTime SubmissionDateTime { get; set; }
}