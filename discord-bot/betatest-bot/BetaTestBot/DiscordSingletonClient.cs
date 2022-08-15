using Discord.WebSocket;

namespace BetaTestBot;

public sealed class DiscordSingletonClient : DiscordSocketClient
{
    private static readonly DiscordSocketConfig Config = new()
    {
        UseInteractionSnowflakeDate = false
    };

    private static readonly DiscordSingletonClient Client = new();

    private DiscordSingletonClient() : base(Config)
    {
    }

    public static DiscordSingletonClient GetClient()
    {
        return Client;
    }
}