using System.Runtime.Serialization;

namespace PoolWarsV0.Rewards.Core.Exceptions;

public class CardTakerException : Exception
{
    public CardTakerException()
    {
    }

    protected CardTakerException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public CardTakerException(string? message) : base(message)
    {
    }

    public CardTakerException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}