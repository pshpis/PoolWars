using Microsoft.Extensions.DependencyInjection;
using PoolWarsV0.Events.Core.Services;
using PoolWarsV0.Events.Core.Services.Implementations;

namespace PoolWarsV0.Events.Core.Tools;

public static class DependencyInjection
{
    public static void AddEvents(this IServiceCollection services)
    {
        services.AddTransient<IEventRepository, EventRepository>();
    }
}