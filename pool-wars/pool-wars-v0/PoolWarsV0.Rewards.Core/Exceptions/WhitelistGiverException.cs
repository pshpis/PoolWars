using System.Runtime.Serialization;

namespace PoolWarsV0.Rewards.Core.Exceptions;

public class WhitelistGiverException : Exception
{
    public WhitelistGiverException()
    {
    }

    protected WhitelistGiverException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public WhitelistGiverException(string? message) : base(message)
    {
    }

    public WhitelistGiverException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}