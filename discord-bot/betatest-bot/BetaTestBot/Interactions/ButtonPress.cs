using BetaTestBot.Commands;
using Discord.WebSocket;

namespace BetaTestBot.Interactions;

public class ButtonPress
{
    public static readonly string[] Ids =
    {
        "GET_BETA"
    };

    public static async Task Execute(SocketMessageComponent press)
    {
        switch (press.Data.CustomId)
        {
            case "GET_BETA":
                using (GiveBetaTest giveBetaTest = new())
                {
                    await giveBetaTest.Execute(press);
                }
                
                break;

            default:
                throw new ArgumentException("BAD_COMPONENT_ID", nameof(press));
        }
    }
}