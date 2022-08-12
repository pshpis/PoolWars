using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using UserAdder;

List<UserData> userData = new();
var optionsBuilder = new DbContextOptionsBuilder<Context>();

var options = optionsBuilder
    .UseNpgsql("Host=194.58.120.95; Port=5432; User Id=admin; Database=poolwars; Password=+4L_cmerxMqA; Include Error Detail=True")
    .Options;

await using Context context = new(options);
await using IDbContextTransaction transaction = await context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

using (TextReader reader = new StreamReader(File.OpenRead("ogSpots.txt")))
{
    var addresses = (await reader.ReadToEndAsync()).Split('\n');

    userData.AddRange(addresses.Distinct().Select(address => new UserData(address, "OG Katt")));
    // var json = await reader.ReadToEndAsync();
    // userData = JsonSerializer.Deserialize<UserData[]>(json, new JsonSerializerOptions(JsonSerializerDefaults.Web))!;
}

MintStageDao ogStage = await context.MintStages
                           .AsTracking()
                           .Include(s => s.WhitelistedUsers)
                           .ThenInclude(u => u.User)
                           .FirstOrDefaultAsync(s => s.Stage == "OG") ??
                       throw new NullReferenceException();

MintStageDao wlStage = await context.MintStages
                           .AsTracking()
                           .Include(s => s.WhitelistedUsers)
                           .ThenInclude(u => u.User)
                           .FirstOrDefaultAsync(s => s.Stage == "WL") ??
                       throw new NullReferenceException();

foreach (UserData user in userData)
{
    if (user.Role == "Whitelisted Katt")
    {
        wlStage.WhitelistedUsers.Add(new()
        {
            RemainingMints = 1,
            User = new()
            {
                Address = user.Wallet
            }
        });
    }
    else if (user.Role == "OG Katt")
    {
        ogStage.WhitelistedUsers.Add(new()
        {
            RemainingMints = 3,
            User = new()
            {
                Address = user.Wallet
            }
        });
    }
    else if (user.Role == "Blocksmith Labs Team")
    {
        ogStage.WhitelistedUsers.Add(new()
        {
            RemainingMints = 3,
            User = new()
            {
                Address = user.Wallet
            }
        });
    }
    else
    {
        throw new($"Unexpected role in {user.Wallet}");
    }
}

context.MintStages.UpdateRange(ogStage, wlStage);
await context.SaveChangesAsync();
await transaction.CommitAsync();