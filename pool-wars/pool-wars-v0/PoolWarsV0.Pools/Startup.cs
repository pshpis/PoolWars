using PoolWarsV0.Core.Tools;
using PoolWarsV0.MetadataReader.Core.Tools;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Pools.Core.Services.Implementations;
using StartupBase = PoolWarsV0.Core.StartupBase;

namespace PoolWarsV0.Pools;

internal class Startup : StartupBase
{
    public Startup(IConfiguration configuration) : base(configuration)
    {
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var rpc = GetRpcUrl();
        services.AddRpcClient(rpc);

        var connectionString = GetConnectionString();
        services.AddDatabase(connectionString);

        services.AddMetadataReader();

        services.AddTransient<IPoolWarRepository, PoolWarRepository>();
        services.AddHttpClient();
        services.AddSwaggerGen();
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (!env.IsProduction())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseRouting();
        app.UseAuthorization();
        app.UseTokenAuthentication();

        app.UseEndpoints(e => e.MapDefaultControllerRoute());
    }
}