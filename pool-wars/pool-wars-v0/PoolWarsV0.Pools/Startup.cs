using PoolWarsV0.Core.Tools;
using PoolWarsV0.MetadataReader.Core.Tools;
using PoolWarsV0.Pools.Core.Tools;
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
        services.AddPools();

        services.AddHttpClient();
        services.AddSwaggerGen();
        services.AddControllers();
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
        app.UseAuthorization();
        app.UseTokenAuthentication();

        app.UseEndpoints(e => e.MapDefaultControllerRoute());
    }
}