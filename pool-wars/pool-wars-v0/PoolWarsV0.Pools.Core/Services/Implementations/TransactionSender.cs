using PoolWarsV0.Pools.Core.Exceptions;
using Solnet.Rpc;
using Solnet.Rpc.Core.Sockets;
using Solnet.Rpc.Models;
using Solnet.Rpc.Types;

namespace PoolWarsV0.Pools.Core.Services.Implementations;

public class TransactionSender : ITransactionSender
{
    private readonly IRpcClient _rpcClient;
    private readonly IStreamingRpcClient _streamingRpcClient;

    public TransactionSender(IRpcClient rpcClient, IStreamingRpcClient streamingRpcClient)
    {
        _rpcClient = rpcClient;
        _streamingRpcClient = streamingRpcClient;
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

            TaskCompletionSource tcs = new(TaskCreationOptions.RunContinuationsAsynchronously);
            SubscriptionState state = null!;

            try
            {
                state = await _streamingRpcClient.SubscribeSignatureAsync(
                    response.Result,
                    (_, _) =>
                    {
                        tcs.SetResult();
                    }
                );

                // Костыль чтобы прогрузилась трананзакция
                await Task.Delay(1000);
                
                // After transaction is sent, check its status
                var transaction = await _rpcClient.GetTransactionAsync(response.Result, Commitment.Confirmed);

                // If not found, wait for confirmation
                if (transaction.Result is null)
                {
                    await tcs.Task.WaitAsync(TimeSpan.FromMinutes(5));
                }
            }
            finally
            {
                if (state != null)
                {
                    await state.UnsubscribeAsync();
                }
            }
        }
        catch (Exception)
        {
            throw new TransactionSenderException();
        }
    }
}