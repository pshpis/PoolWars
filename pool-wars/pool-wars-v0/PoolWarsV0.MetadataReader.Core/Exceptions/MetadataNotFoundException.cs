using System.Runtime.Serialization;

namespace PoolWarsV0.MetadataReader.Core.Exceptions;

public class MetadataNotFoundException : Exception
{
    public MetadataNotFoundException()
    {
    }

    protected MetadataNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public MetadataNotFoundException(string? message) : base(message)
    {
    }

    public MetadataNotFoundException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}