using Microsoft.Extensions.Configuration;

namespace PoolWarsV0.Core;

public abstract class StartupBase
{
    public StartupBase(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected IConfiguration Configuration { get; }

    protected string GetConnectionString()
    {
        var databasePassword = Configuration["DatabasePassword"];
        var connectionString = Configuration.GetConnectionString("DbContext");

        if (databasePassword is { } pwd)
        {
            connectionString = string.Format(connectionString, pwd);
        }

        return connectionString;
    }

    protected string GetRpcUrl()
    {
        return Configuration["Solana:RpcUrl"];
    }
}