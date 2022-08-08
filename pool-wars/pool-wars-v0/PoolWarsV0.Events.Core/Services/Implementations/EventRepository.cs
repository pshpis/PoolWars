using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Events.Core.Exceptions;
using PoolWarsV0.Events.Core.Models;

namespace PoolWarsV0.Events.Core.Services.Implementations;

public class EventRepository : IEventRepository
{
    private readonly Context _context;

    public EventRepository(Context context)
    {
        _context = context;
    }

    public async Task AddEventAsync(Event @event)
    {
        PoolUserDao user = await _context
                               .PoolUsers
                               .AsNoTracking()
                               .FirstOrDefaultAsync(u => u.Address == @event.UserWalletAddress) ??
                           new()
                           {
                               Address = @event.UserWalletAddress
                           };

        UserEvent ev = @event switch
        {
            SwapEvent swap => new SwapEventDao
            {
                UserId = user.Id,
                User = user,
                InputCards = string.Join(" ", swap.InputCards),
                OutputCard = swap.OutputCard
            },
            PoolWarEvent pw => new PoolWarEventDao
            {
                UserId = user.Id,
                User = user,
                Result = pw.Result,
                Cards = string.Join(" ", pw.Cards)
            },
            _ => throw new EventRepositoryException("BAD_EVENT_TYPE")
        };

        try
        {
            await _context.UserEvents.AddAsync(ev);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException e)
        {
            throw new EventRepositoryException("DB_UPDATE_EXCEPTION", e);
        }
    }

    public IAsyncEnumerable<Event> GetEvents(string user)
    {
        Event DaoToObject(UserEvent ev) =>
            ev switch
            {
                SwapEventDao swap => new SwapEvent(swap.User.Address, swap.OutputCard)
                {
                    InputCards = swap.InputCards.Split(' '),
                    Date = swap.Time
                },
                PoolWarEventDao pw => new PoolWarEvent(pw.User.Address)
                {
                    Result = pw.Result,
                    Cards = pw.Cards.Split(' '),
                    Date = pw.Time
                },
                _ => throw new EventRepositoryException("BAD_EVENT_TYPE")
            };

        var events = _context.UserEvents
            .AsNoTracking()
            .Include(e => e.User)
            .Where(e => e.User.Address == user)
            .OrderByDescending(e => e.Time)
            .AsAsyncEnumerable()
            .Select(DaoToObject);

        return events;
    }
}