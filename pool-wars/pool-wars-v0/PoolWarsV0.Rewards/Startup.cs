using PoolWarsV0.Core.Tools;
using PoolWarsV0.Events.Core.Tools;
using PoolWarsV0.Pools.Core.Services.Implementations;
using PoolWarsV0.Pools.Core.Tools;
using PoolWarsV0.Rewards.Core.Services;
using PoolWarsV0.Rewards.Core.Services.Implementations;
using StartupBase = PoolWarsV0.Core.StartupBase;

namespace PoolWarsV0.Rewards;

internal class Startup : StartupBase
{
    public Startup(IConfiguration configuration) : base(configuration)
    {
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var rpc = GetRpcUrl();
        var streamingRpc = GetStreamingRpcUrl();
        services.AddRpcClient(rpc, streamingRpc);

        var connectionString = GetConnectionString();
        services.AddDatabase(connectionString);

        services.AddPools();
        services.AddEvents();
        services.AddTransient<PoolService>();
        services.AddTransient<IWinnerRepository, WinnerRepository>();
        services.AddTransient<IRewardDistributor, RewardDistributor>();
        services.AddTransient<ICardTaker, CardTaker>();
        services.AddHttpClient();
        services.AddSwaggerGen();
        services.AddControllers();
        services.AddDefaultCors();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (!env.IsProduction())
        {
            app.UseSwagger();

            app.UseSwaggerUI(ui =>
            {
                ui.SwaggerEndpoint("swagger/v1/swagger.json", "v1");
                ui.RoutePrefix = "";
            });
        }

        app.UseRouting();
        app.UseCors();
        app.UseAuthorization();
        app.UseTokenAuthentication();

        app.UseEndpoints(e => e.MapDefaultControllerRoute());
    }
}