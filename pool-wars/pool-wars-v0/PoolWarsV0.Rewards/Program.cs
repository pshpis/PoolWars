using PoolWarsV0.Rewards;

IHost host = CreateHost(args);
await host.RunAsync();

IHost CreateHost(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(defaults => defaults.UseStartup<Startup>())
        .Build();