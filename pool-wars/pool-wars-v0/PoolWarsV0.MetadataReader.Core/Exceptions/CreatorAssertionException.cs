using System.Runtime.Serialization;

namespace PoolWarsV0.MetadataReader.Core.Exceptions;

public class CreatorAssertionException : Exception
{
    public CreatorAssertionException()
    {
    }

    protected CreatorAssertionException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public CreatorAssertionException(string? message) : base(message)
    {
    }

    public CreatorAssertionException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}