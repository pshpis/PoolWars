namespace PoolWarsV0.Events.Models;

public class EventsResponse
{
    public List<object> Events { get; set; } = new();

    public int Count { get; set; }
}