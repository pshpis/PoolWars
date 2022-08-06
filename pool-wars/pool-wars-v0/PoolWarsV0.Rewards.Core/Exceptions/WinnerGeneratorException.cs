using System.Runtime.Serialization;

namespace PoolWarsV0.Rewards.Core.Exceptions;

public class WinnerGeneratorException : Exception
{
    public WinnerGeneratorException()
    {
    }

    protected WinnerGeneratorException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public WinnerGeneratorException(string? message) : base(message)
    {
    }

    public WinnerGeneratorException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}