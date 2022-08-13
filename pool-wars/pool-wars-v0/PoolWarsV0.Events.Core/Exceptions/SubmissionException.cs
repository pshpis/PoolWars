using System.Runtime.Serialization;

namespace PoolWarsV0.Events.Core.Exceptions;

public class SubmissionException : Exception
{
    public SubmissionException()
    {
    }

    protected SubmissionException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public SubmissionException(string? message) : base(message)
    {
    }

    public SubmissionException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}