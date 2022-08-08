using System.Text.Json.Serialization;
using PoolWarsV0.Core.Tools;
using PoolWarsV0.Events.Core.Tools;
using StartupBase = PoolWarsV0.Core.StartupBase;

namespace PoolWarsV0.Events;

internal class Startup : StartupBase
{
    public Startup(IConfiguration configuration) : base(configuration)
    {
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = GetConnectionString();
        services.AddDatabase(connectionString);

        services.AddEvents();
        services.AddHttpClient();
        services.AddSwaggerGen();

        services.AddControllers().AddJsonOptions(json =>
        {
            json.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        });
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
        app.UseUserAuthentication();

        app.UseEndpoints(e => e.MapDefaultControllerRoute());
    }
}