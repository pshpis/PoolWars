using PoolWarsV0.Core.Tools;
using PoolWarsV0.Events.Core.Tools;
using PoolWarsV0.MetadataReader.Core.Services;
using PoolWarsV0.MetadataReader.Core.Services.Implementations;
using PoolWarsV0.MetadataReader.Core.Tools;
using StartupBase = PoolWarsV0.Core.StartupBase;

namespace PoolWarsV0.MetadataReader;

internal class Startup : StartupBase
{
    public Startup(IConfiguration configuration) : base(configuration)
    {
    }

    public void ConfigureServices(IServiceCollection services)
    {
        RegisterSwapProgram();
        var rpc = GetRpcUrl();
        services.AddRpcClient(rpc);

        var connectionString = GetConnectionString();
        services.AddDatabase(connectionString);

        services.AddMetadataReader();
        services.AddTransient<ISwapChecker, SwapChecker>();

        services.AddEvents();
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

        app.UseCors();
        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(e => e.MapDefaultControllerRoute());
    }
}