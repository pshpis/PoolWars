using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.Pools.Models;

/// <summary>
///     Pool war object used for creation
/// </summary>
public class PoolWarDto
{
    public string? Description { get; set; }

    /// <summary>
    ///     End timestamp
    /// </summary>
    [Required]
    public long End { get; set; }
}