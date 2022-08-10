using PoolWarsV0.Pools.Core.Exceptions;
using Solnet.Rpc;
using Solnet.Rpc.Models;
using Solnet.Rpc.Types;

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

            await WaitTransaction(response.Result).WaitAsync(TimeSpan.FromMinutes(3));
        }
        catch (Exception)
        {
            throw new TransactionSenderException();
        }
    }

    private async Task WaitTransaction(string transactionId)
    {
        var success = false;
        await Task.Delay(1000);

        while (!success)
        {
            var transaction = await _rpcClient.GetTransactionAsync(transactionId, Commitment.Confirmed);

            success = transaction.Result is { };

            if (success)
            {
                break;
            }

            await Task.Delay(2500);
        }
    }
}