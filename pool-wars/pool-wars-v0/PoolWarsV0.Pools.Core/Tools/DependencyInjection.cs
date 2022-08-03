using Microsoft.Extensions.DependencyInjection;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Pools.Core.Services.Implementations;

namespace PoolWarsV0.Pools.Core.Tools;

public static class DependencyInjection
{
    public static void AddPools(this IServiceCollection services)
    {
        services.AddTransient<IPoolWarRepository, PoolWarRepository>();
        services.AddTransient<ITransactionSender, TransactionSender>();
        services.AddTransient<ITransactionAssertionService, TransactionAssertionService>();
        services.AddTransient<IPoolService, PoolService>();
        ;
    }
}