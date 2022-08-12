using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(Stage), IsUnique = true)]
public class MintStageDao
{
    [Key]
    public int Id { get; set; }

    public string Stage { get; set; } = string.Empty;

    public DateTime StartsAt { get; set; }
}