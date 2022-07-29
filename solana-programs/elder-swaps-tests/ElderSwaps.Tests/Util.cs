using System.Text.Json;
using Solnet.Wallet;

namespace ElderSwaps.Tests;

public static class Util
{
    public static Account ReadFromJson(string path)
    {
        using TextReader reader = new StreamReader(File.OpenRead(path), leaveOpen: false);
        var bytes = JsonSerializer.Deserialize<int[]>(reader.ReadToEnd())?.Select(b => (byte) b).ToArray();

        if (bytes is null)
        {
            throw new FormatException("Not valid json in file");
        }

        return new Wallet(bytes, string.Empty, SeedMode.Bip39).Account;
    }
}