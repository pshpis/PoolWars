using BetaTestBot.Data;
using BetaTestBot.Models;
using Microsoft.EntityFrameworkCore;

namespace BetaTestBot.Services.Implementations;

public class SettingsRepository : ISettingsRepository
{
    private readonly Context _context;

    public SettingsRepository(Context context)
    {
        _context = context;
    }

    public async Task<string?> GetValue(string key)
    {
        return (await _context.Options.AsNoTracking().FirstOrDefaultAsync(o => o.Key == key))?.Key;
    }

    public async Task SetValue(string key, string value)
    {
        DataOption option = await _context
                                .Options
                                .AsTracking()
                                .FirstOrDefaultAsync(o => o.Key == key) ??
                            new()
                            {
                                Key = key,
                                Value = value
                            };

        _context.Options.Update(option);
        await _context.SaveChangesAsync();
    }
}