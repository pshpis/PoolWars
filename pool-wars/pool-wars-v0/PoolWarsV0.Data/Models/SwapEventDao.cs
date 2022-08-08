using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.Data.Models;

public class SwapEventDao : UserEvent
{
    [Required]
    public string InputCards { get; set; } = string.Empty;

    [Required]
    public string OutputCard { get; set; } = string.Empty;
}