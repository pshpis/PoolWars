namespace PoolWarsV0.Events.Core.Models;

public abstract class Event
{
    protected private Event(string userWalletAddress, string type)
    {
        UserWalletAddress = userWalletAddress;
    }

    public string UserWalletAddress { get; set; }

    public string Type { get; set; }
}