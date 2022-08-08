using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.Pools.Core.Models;
using Solnet.Rpc.Models;

namespace PoolWarsV0.Pools.Core.Services;

public interface ITransactionAssertionService
{
    PoolUserAdapter AssertMessageValid(Message message, CardMetadata metadata, Pool pool);
}