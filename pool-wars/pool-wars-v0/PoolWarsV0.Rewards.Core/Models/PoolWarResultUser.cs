namespace PoolWarsV0.Rewards.Core.Models;

public class PoolWarResultUser
{
    public string Address { get; set; } = string.Empty;

    public ICollection<PoolWarResultCard> Cards { get; set; } = new List<PoolWarResultCard>();
}