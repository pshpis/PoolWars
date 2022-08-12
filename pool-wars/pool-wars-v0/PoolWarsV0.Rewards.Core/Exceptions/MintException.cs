using System.Runtime.Serialization;

namespace PoolWarsV0.Rewards.Core.Exceptions;

public class MintException : Exception
{
    public MintException()
    {
    }

    protected MintException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public MintException(string? message) : base(message)
    {
    }

    public MintException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}