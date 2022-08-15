using BetaTestBot.Data;
using BetaTestBot.Services;
using BetaTestBot.Services.Implementations;
using Discord;
using Discord.WebSocket;

namespace BetaTestBot.Commands;

public sealed class GiveBetaTest : IDisposable
{
    private readonly IChannelLogger _channelLogger;
    private readonly Context _context;
    private readonly ISettingsRepository _settingsRepository;

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

        if (user.RoleIds.Any(r => r.ToString() == betaTestRole))
        {
            await interaction.RespondAsync(
                "You are already a **__beta tester__**! Find out about beta test here <#1006707210140786840>",
                ephemeral: true);
            
            return;
        }
        
        if (user.RoleIds.Any(r => r.ToString() == ogRole))
        {
            await user.AddRoleAsync(ulong.Parse(betaTestRole!));

            await interaction.RespondAsync(
                "You are **__beta tester__** now! You can read more about beta test here <#1006707210140786840>",
                ephemeral: true);

            await _channelLogger.Log($"{user.Mention} obtained BETA (OG)");
            return;
        }

        if (user.RoleIds.Any(r => r.ToString() == wlRole))
        {
            var freeSpots = await _settingsRepository.GetValue("BETA_TEST_SPOTS");

            if (ulong.TryParse(freeSpots, out var spots) && spots > 0)
            {
                await user.AddRoleAsync(ulong.Parse(betaTestRole!));

                await interaction.RespondAsync(
                    "You are **__beta tester__** now! You can read more about beta test here <#1006707210140786840>",
                    ephemeral: true);

                await _settingsRepository.SetValue("BETA_TEST_SPOTS", (spots - 1).ToString());
                await _channelLogger.Log($"{user.Mention} obtained BETA (WL) ({spots - 1} spots left)");
                return;
            }

            await interaction.RespondAsync(
                "Ooops, spots for beta test *__is over__*. Try to become OG and get access to ***__beta test!__***",
                ephemeral: true);

            return;
        }

        await interaction.RespondAsync("You must be WL or OG to become beta tester", ephemeral: true);
    }
}