using BetaTestBot.Models;
using Microsoft.EntityFrameworkCore;

namespace BetaTestBot.Data;

public class Context : DbContext
{
    public DbSet<DataOption> Options { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=194.58.120.95; Port=5432; User Id=admin; Database=beta-test-bot; Password=+4L_cmerxMqA");
    }
}