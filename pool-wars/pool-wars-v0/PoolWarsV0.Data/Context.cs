using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data.Models;

namespace PoolWarsV0.Data;

public class Context : DbContext
{
    public Context(DbContextOptions options) : base(options)
    {
    }

    public DbSet<SolanaAddress> Addresses { get; set; } = null!;

    public DbSet<CardMintAddress> CardMintAddresses { get; set; } = null!;

    public DbSet<AllowedCreatorAddress> AllowedCreatorAddresses { get; set; } = null!;

    public DbSet<CardMetadataDao> CardMetadata { get; set; } = null!;

    public DbSet<PoolDao> Pools { get; set; } = null!;

    public DbSet<PoolDepositDao> Deposits { get; set; } = null!;

    public DbSet<PoolWarResultDao> PoolWarsResults { get; set; } = null!;

    public DbSet<ResultUserLink> ResultUserLinks { get; set; } = null!;

    public DbSet<UserResultCard> UserResultCards { get; set; } = null!;
    
    public DbSet<PoolWarDao> PoolWars { get; set; } = null!;

    public DbSet<PoolUserDao> PoolUsers { get; set; } = null!;
}