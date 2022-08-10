using BetaTestBot.Commands;
using Discord.WebSocket;

namespace BetaTestBot.Interactions;

public class SlashCommand
{
    public static readonly string[] Commands =
    {
        "modal"
    };

    public static async Task Execute(SocketSlashCommand command)
    {
        switch (command.Data.Name)
        {
            case "modal":
                await SpawnEmbed.Execute(command);
                break;

            default:
                throw new ArgumentException("BAD_COMMAND", nameof(command));
        }
    }
}