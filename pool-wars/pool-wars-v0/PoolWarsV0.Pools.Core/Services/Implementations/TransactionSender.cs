using PoolWarsV0.Pools.Core.Exceptions;
using Solnet.Rpc;
using Solnet.Rpc.Models;

namespace PoolWarsV0.Pools.Core.Services.Implementations;

public class TransactionSender : ITransactionSender
{
    private readonly IRpcClient _rpcClient;

    public TransactionSender(IRpcClient rpcClient)
    {
        _rpcClient = rpcClient;
    }

    public async Task Send(Transaction tx)
    {
        try
        {
            var response = await _rpcClient.SendTransactionAsync(tx.Serialize());

            if (!response.WasSuccessful || response.ErrorData is { })
            {
                throw new TransactionSenderException();
            }
        }
        catch (Exception)
        {
            throw new TransactionSenderException();
        }
    }
}