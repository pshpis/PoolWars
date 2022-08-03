using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Pools.Core.Services.Implementations;

public class PoolWarRepository : IPoolWarRepository
{
    private readonly Context _context;

    public PoolWarRepository(Context context)
    {
        _context = context;
    }

    public Task<PoolWar> StartPoolWarAsync(string description, DateTime date)
    {
        return Create(date, description);
    }

    public Task<PoolWar> StartPoolWarAsync(DateTime date)
    {
        return Create(date);
    }

    public IAsyncEnumerable<PoolWar> GetPoolWarsAsync()
    {
        return _context.PoolWars
            .AsNoTracking()
            .Include(w => w.Pools).AsAsyncEnumerable().Select(w => new PoolWar
            {
                Description = w.Description,
                Pools = w.Pools.Select(p => new Pool
                {
                    Address = p.Address
                }).ToList()
            });
    }

    private async Task<PoolWar> Create(DateTime date, string? description = null)
    {
        PoolWarDao poolWar = new()
        {
            Description = description,
            End = date,
            Pools = new List<PoolDao>(Enumerable.Range(start: 0, count: 2).Select(_ =>
            {
                Account account = new();

                return new PoolDao
                {
                    Address = account.PublicKey,
                    PrivateKey = account.PrivateKey
                };
            }))
        };

        try
        {
            await _context.PoolWars.AddAsync(poolWar);
            await _context.SaveChangesAsync();

            return new()
            {
                Description = poolWar.Description,
                Pools = poolWar.Pools.Select(p => new Pool
                {
                    Address = p.Address
                }).ToList()
            };
        }
        catch (DbUpdateException)
        {
            throw new PoolWarRepositoryException();
        }
    }
}