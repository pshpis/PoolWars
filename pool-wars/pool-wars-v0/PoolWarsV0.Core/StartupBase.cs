using Microsoft.Extensions.Configuration;
using Solnet.Programs;
using Solnet.Wallet;

namespace PoolWarsV0.Core;

public abstract class StartupBase
{
    protected StartupBase(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    private IConfiguration Configuration { get; }

    protected string GetConnectionString()
    {
        var databasePassword = Configuration["DatabasePassword"];
        var connectionString = Configuration.GetConnectionString("DbContext");

        if (databasePassword != null)
        {
            connectionString = string.Format(connectionString, databasePassword);
        }

        return connectionString;
    }

    protected string GetRpcUrl()
    {
        return Configuration["Solana:RpcUrl"];
    }

    protected string GetStreamingRpcUrl()
    {
        return Configuration["Solana:StreamingRpcUrl"];
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
                        {"User", keys[keyIndices[0]]},
                        {"SwapConfig", keys[keyIndices[1]]},
                        {"Mint", keys[keyIndices[2]]}
                    }
                };
            }
        );
    }
}