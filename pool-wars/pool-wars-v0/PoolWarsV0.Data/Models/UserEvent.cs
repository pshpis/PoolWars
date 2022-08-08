using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(UserId), IsUnique = false)]
public abstract class UserEvent
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }

    [Required]
    public PoolUserDao User { get; set; } = null!;

    [Required]
    public DateTime Time { get; set; } = DateTime.UtcNow;
}