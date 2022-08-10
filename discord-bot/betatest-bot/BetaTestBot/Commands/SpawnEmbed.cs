using Discord;
using Discord.WebSocket;

namespace BetaTestBot.Commands;

public class SpawnEmbed
{
    public static async Task Execute(SocketInteraction interaction)
    {
        await interaction.RespondAsync(text: null,
            embed: new EmbedBuilder()
                .WithColor(new(0x722f37))
                .WithTitle("**BETA TEST**")
                .WithDescription("")
                .Build(),
            components: new ComponentBuilder()
                .WithButton("GET", "GET_BETA", ButtonStyle.Danger)
                .Build()
        );
    }
}