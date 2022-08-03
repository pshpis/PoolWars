using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.MetadataReader.Core.Exceptions;

namespace PoolWarsV0.MetadataReader.Core.Services.Implementations;

public class VerifiedCreatorAssertion : IVerifiedCreatorAssertion
{
    private readonly Context _context;

    public VerifiedCreatorAssertion(Context context)
    {
        _context = context;
    }

    public async Task AssertCreatorVerifiedAsync(string creator)
    {
        var exists = await _context.AllowedCreatorAddresses.AsNoTracking()
            .AnyAsync(c => c.Address == creator);

        if (!exists)
        {
            throw new CreatorAssertionException();
        }
    }

    public void AssertCreatorVerified(string creator)
    {
        var exists = _context.AllowedCreatorAddresses.AsNoTracking().Any(c => c.Address == creator);

        if (!exists)
        {
            throw new CreatorAssertionException();
        }
    }
}