namespace BetaTestBot.Services;

public interface IChannelLogger : IDisposable
{
    Task Log(string message);
}