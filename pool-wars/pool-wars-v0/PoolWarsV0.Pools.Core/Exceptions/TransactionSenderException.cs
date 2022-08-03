using System.Runtime.Serialization;

namespace PoolWarsV0.Pools.Core.Exceptions;

public class TransactionSenderException : Exception
{
    public TransactionSenderException()
    {
    }

    protected TransactionSenderException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public TransactionSenderException(string? message) : base(message)
    {
    }

    public TransactionSenderException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}