using Discord;
using Discord.WebSocket;

namespace BetaTestBot.Commands;

public class SpawnEmbed
{
    public static async Task Execute(SocketInteraction interaction)
    {
        DiscordSocketClient client = DiscordSingletonClient.GetClient();
        IChannel? channel = await client.GetChannelAsync(interaction.ChannelId!.Value);

        if (channel is IMessageChannel ch)
        {
            await ch.SendMessageAsync(
                text: null,
                embed: new EmbedBuilder()
                    .WithColor(new(0x722f37))
                    .WithTitle("**BETA TEST**\n-------------------")
                    .WithDescription("Become <@&1006702414151299092> now")
                    .Build(),
                components: new ComponentBuilder()
                    .WithButton("BECOME", "GET_BETA", ButtonStyle.Danger)
                    .Build()
            );
        }

        await interaction.RespondAsync(text: "ready");
    }
}