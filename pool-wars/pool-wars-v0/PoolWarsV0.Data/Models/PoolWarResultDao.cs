using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data.Models;

[Index(nameof(PoolWarId), IsUnique = true)]
[Index(nameof(WinnerPoolId), IsUnique = true)]
public class PoolWarResultDao
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey(nameof(PoolWar))]
    public int PoolWarId { get; set; }

    [Required]
    public PoolWarDao PoolWar { get; set; } = null!;

    [Required]
    [ForeignKey(nameof(WinnerPool))]
    public int WinnerPoolId { get; set; }

    [Required]
    public PoolDao WinnerPool { get; set; } = null!;

    public ICollection<ResultUserLink> Users { get; set; } = new List<ResultUserLink>();
}

[Index(nameof(UserId), nameof(ResultId), IsUnique = true)]
public class ResultUserLink
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    [Required]
    public int UserId { get; set; }

    [Required]
    public PoolUserDao User { get; set; } = null!;

    [ForeignKey(nameof(Result))]
    [Required]
    public int ResultId { get; set; }

    [Required]
    public PoolWarResultDao Result { get; set; } = null!;

    public ICollection<UserResultCard> Cards { get; set; } = new List<UserResultCard>();
}

[Index(nameof(LinkId), nameof(CardId), IsUnique = true)]
public class UserResultCard
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Link))]
    [Required]
    public int LinkId { get; set; }

    [Required]
    public ResultUserLink Link { get; set; } = null!;

    [ForeignKey(nameof(Card))]
    [Required]
    public int CardId { get; set; }

    [Required]
    public CardMetadataDao Card { get; set; } = null!;

    [Required]
    public bool Given { get; set; } = false;
}