using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;

namespace PoolWarsV0.MetadataReader.Core.Services.Implementations;

public sealed class DatabaseMetadataReader : IMetadataReader, IDisposable
{
    private readonly Context _context;
    private readonly IServiceScope _scope;

    public DatabaseMetadataReader(IServiceProvider provider)
    {
        _scope = provider.CreateScope();
        _context = _scope.ServiceProvider.GetRequiredService<Context>();
    }

    public void Dispose()
    {
        _scope.Dispose();
    }

    public async ValueTask<CardMetadata> ReadMetadata(string mintAddress)
    {
        CardMetadataDao metadataDao = await _context.CardMetadata
                                          .AsNoTracking()
                                          .Include(m => m.CardMint)
                                          .FirstOrDefaultAsync(m => m.CardMint.Address == mintAddress) ??
                                      throw new MetadataNotFoundException();

        CardMetadata metadata = new()
        {
            Type = metadataDao.Type,
            Strength = metadataDao.Strength,
            Mint = metadataDao.CardMint.Address
        };

        return metadata;
    }

    public async Task AddMetadata(CardMetadata metadata)
    {
        CardMetadataDao dao = new()
        {
            Strength = metadata.Strength,
            CardMint = new()
            {
                Address = metadata.Mint
            },
            Type = metadata.Type
        };

        try
        {
            await _context.CardMetadata.AddAsync(dao);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            throw new MetadataAddException();
        }
    }
}