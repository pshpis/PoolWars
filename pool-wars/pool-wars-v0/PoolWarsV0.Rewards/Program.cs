using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.Rewards;

IHost host = CreateHost(args);

using (IServiceScope scope = host.Services.CreateScope())
{
    Context context = scope.ServiceProvider.GetRequiredService<Context>();

    if ((await context.Database.GetPendingMigrationsAsync()).Any())
    {
        await context.Database.MigrateAsync();
    }
}

await host.RunAsync();

IHost CreateHost(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(defaults => defaults.UseStartup<Startup>())
        .Build();