using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(Stage), IsUnique = true)]
public class MintStageDao
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Stage { get; set; } = string.Empty;

    [Required]
    public DateTime StartsAt { get; set; }

    public ICollection<WhitelistedUserDao> WhitelistedUsers { get; set; } = new List<WhitelistedUserDao>();
}