namespace PoolWarsV0.Events.Core.Models;

public class SwapEvent : Event
{
    public SwapEvent(string userWalletAddress, string outputCard) : base(userWalletAddress, "swap")
    {
        OutputCard = outputCard;
    }

    public ICollection<string> InputCards { get; set; } = new List<string>();

    public string OutputCard { get; set; }
}