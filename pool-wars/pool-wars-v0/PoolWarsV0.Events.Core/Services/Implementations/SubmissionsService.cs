using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Events.Core.Exceptions;
using Solnet.Wallet;

namespace PoolWarsV0.Events.Core.Services.Implementations;

public class SubmissionsService : ISubmissionsService
{
    private readonly Context _context;
    private readonly ILogger<SubmissionsService> _logger;

    public SubmissionsService(Context context, ILogger<SubmissionsService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task SubmitWallet(PublicKey wallet, string discordId)
    {
        await using IDbContextTransaction dbTransaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Snapshot);

        PoolUserDao user = await _context.PoolUsers
                               .AsTracking()
                               .Include(u => u.WalletSubmission)
                               .FirstOrDefaultAsync(u => u.Address == wallet.Key) ??
                           new()
                           {
                               Address = wallet.Key
                           };

        user.WalletSubmission ??= new()
        {
            SubmissionDateTime = DateTime.UtcNow,
            DiscordId = discordId
        };

        try
        {
            _context.PoolUsers.Update(user);
            await _context.SaveChangesAsync();
            await dbTransaction.CommitAsync();
        }
        catch (DbUpdateException e)
        {
            _logger.LogError("{Message}", e.Message);
            throw new SubmissionException("DB_UPDATE_EXCEPTION");
        }
    }

    public async Task<bool> Status(PublicKey wallet)
    {
        return await _context.PoolUsers
            .AsNoTracking()
            .Include(u => u.WalletSubmission)
            .AnyAsync(u => u.Address == wallet.Key && u.WalletSubmission != null);
    }
}