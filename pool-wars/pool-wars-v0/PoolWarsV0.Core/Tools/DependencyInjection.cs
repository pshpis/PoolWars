using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using PoolWarsV0.Core.Middleware;
using PoolWarsV0.Data;
using Solnet.Rpc;
using Solnet.Rpc.Utilities;
using RateLimiter = PoolWarsV0.Core.Services.Implementations.RateLimiter;

namespace PoolWarsV0.Core.Tools;

public static class DependencyInjection
{
    public static void AddDatabase(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<Context>(context =>
            context.UseNpgsql(
                connectionString,
                options =>
                    options
                        .MigrationsAssembly("PoolWarsV0.Data")
            )
        );
    }

    public static void AddRpcClient(this IServiceCollection services, string rpc)
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
            return ClientFactory.GetClient(rpc, logger, rateLimiter);
        });
    }

    public static void UseTokenAuthentication(this IApplicationBuilder app)
    {
        app.UseMiddleware<TokenAuthenticationMiddleware>();
    }

    public static void AddDefaultCors(this IServiceCollection services)
    {
        services.AddCors(cors =>
        {
            cors.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyHeader();
                policy.AllowAnyOrigin();
                policy.AllowAnyMethod();
            });
        });
    }
}