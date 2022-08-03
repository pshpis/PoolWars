using System.Runtime.Serialization;

namespace PoolWarsV0.MetadataReader.Core.Exceptions;

public class MetadataAddException : Exception
{
    public MetadataAddException()
    {
    }

    protected MetadataAddException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public MetadataAddException(string? message) : base(message)
    {
    }

    public MetadataAddException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}