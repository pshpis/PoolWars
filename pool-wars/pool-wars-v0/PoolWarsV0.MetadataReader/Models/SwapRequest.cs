using System.ComponentModel.DataAnnotations;

namespace PoolWarsV0.MetadataReader.Models;

/// <summary>
///     Wrapper for base64-encoded message with swap instruction
/// </summary>
public class SwapRequest
{
    /// <summary>
    ///     Base64-encoded message
    /// </summary>
    [Required]
    public string Message { get; set; } = string.Empty;
}