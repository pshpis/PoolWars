using Microsoft.Extensions.DependencyInjection;
using PoolWarsV0.MetadataReader.Core.Services;
using PoolWarsV0.MetadataReader.Core.Services.Implementations;

namespace PoolWarsV0.MetadataReader.Core.Tools;

public static class DependencyInjection
{
    public static void AddMetadataReader(this IServiceCollection services)
    {
        services.AddTransient<DatabaseMetadataReader>();
        services.AddTransient<SolscanMetadataReader>();
        services.AddTransient<IMetadataReader, CachedMetadataReader>();
        services.AddTransient<IVerifiedCreatorAssertion, VerifiedCreatorAssertion>();
    }
}