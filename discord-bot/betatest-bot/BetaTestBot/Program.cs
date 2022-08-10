// See https://aka.ms/new-console-template for more information

using BetaTestBot;
using BetaTestBot.Interactions;
using Discord;
using Discord.WebSocket;

DiscordSocketClient client = DiscordSingletonClient.GetClient();

client.Log += async message =>
{
    await Console.Out.WriteLineAsync(message.Message);
};

client.Ready += async () =>
{
    foreach (var cmd in SlashCommand.Commands)
    {
        SlashCommandProperties command = new SlashCommandBuilder()
            .WithName(cmd)
            .Build();
        
        await client.CreateGlobalApplicationCommandAsync(command);
    }
};

client.SlashCommandExecuted += async command =>
{
    await SlashCommand.Execute(command);
};

client.ButtonExecuted += async button =>
{
    await ButtonPress.Execute(button);
};

await client.StartAsync();
await Task.Delay(-1);