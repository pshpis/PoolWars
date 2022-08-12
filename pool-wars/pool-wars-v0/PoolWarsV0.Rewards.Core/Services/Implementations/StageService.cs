using Microsoft.EntityFrameworkCore;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Rewards.Core.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class StageService : IStageService
{
    private readonly Context _context;

    public StageService(Context context)
    {
        _context = context;
    }

    public async Task<MintStage> GetCurrentStage()
    {
        DateTime date = DateTime.UtcNow;

        MintStageDao? dao = await _context.MintStages
            .AsNoTracking()
            .Where(s => s.StartsAt < date)
            .OrderByDescending(s => s.StartsAt)
            .FirstOrDefaultAsync();

        return dao switch
        {
            {Stage: "OG"} => MintStage.Og,
            {Stage: "WL"} => MintStage.Whitelist,
            {Stage: "PUBLIC"} => MintStage.Public,
            _ => MintStage.None
        };
    }

    public Task<MintStage> GetWalletStage(PublicKey wallet)
    {
        return Task.FromResult(wallet.Key == "4yPHTi9whraHaRvQNH2e1AJezDJvPUTjehyrjKHzPLj5" ? MintStage.Og : MintStage.Public);
    }
}