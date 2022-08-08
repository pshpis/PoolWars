namespace PoolWarsV0.Events.Core.Models;

public abstract class Event
{
    protected private Event(string userWalletAddress, string type)
    {
        UserWalletAddress = userWalletAddress;
        Type = type;
    }

    public string UserWalletAddress { get; set; }

    public string Type { get; set; }

    public DateTime Date { get; set; }
}