using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class WhitelistGiver : IWhitelistGiver
{
    private readonly ICardParser _cardParser;
    private readonly Context _context;

    public WhitelistGiver(Context context, ICardParser cardParser)
    {
        _context = context;
        _cardParser = cardParser;
    }

    public async Task GiveSpotsToWallet(PublicKey wallet)
    {
        await using IDbContextTransaction dbTransaction = await _context.Database.BeginTransactionAsync(IsolationLevel.RepeatableRead);
        DateTime date = DateTime.UtcNow;

        MintStageDao stageDao = await _context.MintStages
                                    .AsNoTracking()
                                    .Where(s => s.StartsAt < date)
                                    .OrderByDescending(s => s.StartsAt)
                                    .FirstOrDefaultAsync() ??
                                throw new WhitelistGiverException("NO_STAGE_NOW");

        if (stageDao.Stage == "PUBLIC")
        {
            return;
        }

        CardsData cards = await _cardParser.GetWalletCards(wallet);

        if (cards.LegendaryCardCount == 0 && cards.CardCount == 0)
        {
            return;
        }

        if (cards.LegendaryCardCount == 0)
        {
            stageDao = await _context.MintStages
                           .AsNoTracking()
                           .FirstOrDefaultAsync(s => s.Stage == "WL") ??
                       throw new WhitelistGiverException("STAGE_NOT_FOUND");
        }

        PoolUserDao userDao = await _context.PoolUsers
                                  .AsTracking()
                                  .Include(u => u.WhitelistData)
                                  .FirstOrDefaultAsync(u => u.Address == wallet.Key) ??
                              new()
                              {
                                  Address = wallet.Key
                              };

        userDao.WhitelistData ??= new()
        {
            MintedAmount = 0
        };

        userDao.WhitelistData.StageId = stageDao.Id;
        userDao.WhitelistData.CanMintTotal = cards.LegendaryCardCount * 5 + cards.CardCount * 2;

        _context.PoolUsers.Update(userDao);
        await _context.SaveChangesAsync();
        await dbTransaction.CommitAsync();
    }
}