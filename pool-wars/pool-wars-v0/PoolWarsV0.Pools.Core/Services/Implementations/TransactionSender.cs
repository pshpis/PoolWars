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

            TaskCompletionSource tcs = new();
            SubscriptionState state = null!;

            try
            {
                state = await _streamingRpcClient.SubscribeSignatureAsync(
                    response.Result,
                    (_, _) =>
                    {
                        tcs.SetResult();
                    },
                    Commitment.Confirmed
                );

                await tcs.Task.WaitAsync(TimeSpan.FromMinutes(5));
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