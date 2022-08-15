using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BetaTestBot.Models;

[Index(nameof(Key), IsUnique = true)]
[Table("Options")]
public class DataOption
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Key { get; set; } = string.Empty;

    [Required]
    public string Value { get; set; } = string.Empty;
}