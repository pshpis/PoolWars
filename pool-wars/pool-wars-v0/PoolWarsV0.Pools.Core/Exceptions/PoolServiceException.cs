using System.Runtime.Serialization;

namespace PoolWarsV0.Pools.Core.Exceptions;

public class PoolServiceException : Exception
{
    public PoolServiceException()
    {
    }

    protected PoolServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public PoolServiceException(string? message) : base(message)
    {
    }

    public PoolServiceException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}