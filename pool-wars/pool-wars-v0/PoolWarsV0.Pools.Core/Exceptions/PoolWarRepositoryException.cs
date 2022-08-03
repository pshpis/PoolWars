using System.Runtime.Serialization;

namespace PoolWarsV0.Pools.Core.Exceptions;

public class PoolWarRepositoryException : Exception
{
    public PoolWarRepositoryException()
    {
    }

    protected PoolWarRepositoryException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public PoolWarRepositoryException(string? message) : base(message)
    {
    }

    public PoolWarRepositoryException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}