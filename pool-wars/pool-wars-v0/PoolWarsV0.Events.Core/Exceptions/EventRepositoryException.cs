using System.Runtime.Serialization;

namespace PoolWarsV0.Events.Core.Exceptions;

public class EventRepositoryException : Exception
{
    public EventRepositoryException()
    {
    }

    protected EventRepositoryException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public EventRepositoryException(string? message) : base(message)
    {
    }

    public EventRepositoryException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}