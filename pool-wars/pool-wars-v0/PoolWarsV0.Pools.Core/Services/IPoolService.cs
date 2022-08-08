using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.Pools.Core.Models;
using Solnet.Rpc.Models;

namespace PoolWarsV0.Pools.Core.Services;

public interface IPoolService
{
    Task<PoolState> GetPoolStrengthAsync(string address, string? userAddress);

    Task<PoolState> DepositCardAsync(CardMetadata metadata, Pool pool, Message signCardMessage, byte[] signature);
}