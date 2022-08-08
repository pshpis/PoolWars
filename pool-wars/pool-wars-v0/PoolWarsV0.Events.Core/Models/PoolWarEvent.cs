using PoolWarsV0.Data.Models;

namespace PoolWarsV0.Events.Core.Models;

public class PoolWarEvent : Event
{
    public PoolWarEvent(string userWalletAddress) : base(userWalletAddress, "poolwar-v0")
    {
    }

    public PoolWarWinLose Result { get; set; }

    public ICollection<string> Cards { get; set; } = new List<string>();
}