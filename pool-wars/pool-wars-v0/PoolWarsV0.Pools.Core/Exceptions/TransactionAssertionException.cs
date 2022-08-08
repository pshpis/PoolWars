using System.Runtime.Serialization;

namespace PoolWarsV0.Pools.Core.Exceptions;

public class TransactionAssertionException : Exception
{
    public TransactionAssertionException()
    {
    }

    protected TransactionAssertionException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public TransactionAssertionException(string? message) : base(message)
    {
    }

    public TransactionAssertionException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}