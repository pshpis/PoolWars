using BetaTestBot.Data;
using BetaTestBot.Services;
using BetaTestBot.Services.Implementations;
using Discord;
using Discord.WebSocket;

namespace BetaTestBot.Commands;

public sealed class GiveBetaTest : IDisposable
{
    private readonly Context _context;
    private readonly ISettingsRepository _settingsRepository;
    private readonly IChannelLogger _channelLogger;

    public GiveBetaTest()
    {
        _context = new();
        _settingsRepository = new SettingsRepository(_context);
        _channelLogger = new ChannelLogger(_context);
    }

    public void Dispose()
    {
        _channelLogger.Dispose();
        _context.Dispose();
    }

    public async Task Execute(SocketInteraction interaction)
    {
        var wlRole = await _settingsRepository.GetValue("WL_ROLE");
        var ogRole = await _settingsRepository.GetValue("OG_ROLE");
        var betaTestRole = await _settingsRepository.GetValue("BETA_TEST_ROLE");
        IGuildUser user = (interaction.User as IGuildUser)!;

        if (user.RoleIds.Any(r => r.ToString() == ogRole))
        {
            await user.AddRoleAsync(ulong.Parse(betaTestRole!));
            await interaction.RespondAsync("You are a beta tester now!", ephemeral: true);
            await _channelLogger.Log($"{user.Mention} obtained WL");
            return;
        }

        if (user.RoleIds.Any(r => r.ToString() == wlRole))
        {
            var freeSpots = await _settingsRepository.GetValue("BETA_TEST_ROLE");

            if (ulong.TryParse(freeSpots, out var spots) && spots > 0)
            {
                await user.AddRoleAsync(ulong.Parse(betaTestRole!));
                await interaction.RespondAsync("You are a beta tester now!", ephemeral: true);
                await _settingsRepository.SetValue("BETA_TEST_ROLE", (spots - 1).ToString());
                await _channelLogger.Log($"{user.Mention} obtained WL");
                return;
            }

            await interaction.RespondAsync("Out of beta test spots for WL members", ephemeral: true);
            return;
        }

        await interaction.RespondAsync("You must be WL or OG to become beta tester", ephemeral: true);
    }
}