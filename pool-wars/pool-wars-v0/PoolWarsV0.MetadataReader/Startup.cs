using Solnet.Rpc;
using Solnet.Rpc.Utilities;
using RateLimiter = PoolWarsV0.MetadataReader.Core.Services.Implementations.RateLimiter;

namespace PoolWarsV0.MetadataReader;

internal class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IRateLimiter>(factory =>
        {
            var logger = factory.GetRequiredService<ILogger<RateLimiter>>();
            return new RateLimiter(TimeSpan.FromSeconds(10), maxPerWaitTime: 40, logger);
        });

        services.AddScoped<IRpcClient>(factory =>
        {
            var logger = factory.GetRequiredService<ILogger<IRpcClient>>();
            IRateLimiter rateLimiter = factory.GetRequiredService<IRateLimiter>();
            return ClientFactory.GetClient(Cluster.MainNet, logger, rateLimiter);
        });

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

        app.UseEndpoints(e => e.MapDefaultControllerRoute());
    }
}