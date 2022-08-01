using Microsoft.EntityFrameworkCore;

namespace PoolWarsV0.Data;

public class Context : DbContext
{
    public Context(DbContextOptions options) : base(options)
    {
    }
}