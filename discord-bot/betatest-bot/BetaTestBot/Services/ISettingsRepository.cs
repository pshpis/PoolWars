namespace BetaTestBot.Services;

public interface ISettingsRepository
{
    Task<string?> GetValue(string key);

    Task SetValue(string key, string value);
}