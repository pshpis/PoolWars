using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(Address), IsUnique = true)]
public abstract class SolanaAddress
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Address { get; set; } = string.Empty;
}