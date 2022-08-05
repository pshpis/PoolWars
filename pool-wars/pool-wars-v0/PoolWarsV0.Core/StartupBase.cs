using Microsoft.Extensions.Configuration;
using Solnet.Programs;
using Solnet.Wallet;

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

    protected void RegisterSwapProgram()
    {
        PublicKey programId = new(Configuration["Swap:SwapProgramId"]);

        InstructionDecoder.Register(programId,
            (_, keys, keyIndices) =>
            {
                var mints = new List<PublicKey>();

                for (var i = 17; i < keyIndices.Length; i += 3)
                {
                    mints.Add(keys[keyIndices[i]]);
                }

                return new()
                {
                    PublicKey = programId,
                    Values = new()
                    {
                        {"Mints", mints},
                        {"SwapConfig", keys[keyIndices[1]]}
                    }
                };
            }
        );
    }
}