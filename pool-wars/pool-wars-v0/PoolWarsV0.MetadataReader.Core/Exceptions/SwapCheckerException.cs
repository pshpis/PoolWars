using System.Runtime.Serialization;

namespace PoolWarsV0.MetadataReader.Core.Exceptions;

public class SwapCheckerException : Exception
{
    public SwapCheckerException()
    {
    }

    protected SwapCheckerException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public SwapCheckerException(string? message) : base(message)
    {
    }

    public SwapCheckerException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}