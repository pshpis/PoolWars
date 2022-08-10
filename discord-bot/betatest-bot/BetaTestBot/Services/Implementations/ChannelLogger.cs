using BetaTestBot.Data;
using Discord;
using Discord.WebSocket;

namespace BetaTestBot.Services.Implementations;

public sealed class ChannelLogger : IChannelLogger
{
    private readonly DiscordSocketClient _client;
    private readonly ISettingsRepository _settingsRepository;
    private readonly Context _context;

    public ChannelLogger(Context context)
    {
        _client = DiscordSingletonClient.GetClient();
        _context = context;
        _settingsRepository = new SettingsRepository(_context);
    }
    
    public async Task Log(string message)
    {
        var logChannel = await _settingsRepository.GetValue("LOG_CHANNEL");
        IChannel channel = await _client.GetChannelAsync(ulong.Parse(logChannel!));

        if (channel is IMessageChannel messageChannel)
        {
            await messageChannel.SendMessageAsync(message);
        }
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}