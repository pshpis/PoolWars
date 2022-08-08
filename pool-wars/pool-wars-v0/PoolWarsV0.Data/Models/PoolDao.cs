using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(PoolWarId), IsUnique = false)]
[Index(nameof(Address), IsUnique = true)]
[Index(nameof(PrivateKey), IsUnique = true)]
public class PoolDao
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Address { get; set; } = string.Empty;

    [Required]
    public string PrivateKey { get; set; } = string.Empty;

    [Required]
    [ForeignKey(nameof(PoolWar))]
    public int PoolWarId { get; set; }

    [Required]
    public PoolWarDao PoolWar { get; set; } = null!;

    public ICollection<PoolDepositDao> Deposits { get; set; } = null!;
}