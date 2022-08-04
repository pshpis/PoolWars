using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.Data.Models;

public class PoolWarDao
{
    [Key]
    public int Id { get; set; }

    public string? Description { get; set; }

    public ICollection<PoolDao> Pools { get; set; } = null!;

    public PoolWarResultDao? Result { get; set; }

    [Required]
    public DateTime End { get; set; }
}