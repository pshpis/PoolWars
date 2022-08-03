using Solnet.Rpc.Models;

namespace PoolWarsV0.Pools.Core.Services;

public interface ITransactionSender
{
    Task Send(Transaction tx);
}