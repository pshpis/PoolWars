using PoolWarsV0.Events.Core.Models;

namespace PoolWarsV0.Events.Core.Services;

public interface IEventRepository
{
    Task AddEventAsync(Event @event);

    IAsyncEnumerable<Event> GetEvents(string user);
}