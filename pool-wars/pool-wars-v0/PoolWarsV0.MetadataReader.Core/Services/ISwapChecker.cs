using Solnet.Rpc.Models;

namespace PoolWarsV0.MetadataReader.Core.Services;

public interface ISwapChecker
{
    Task<byte[]> SignSwap(Message swap);
}