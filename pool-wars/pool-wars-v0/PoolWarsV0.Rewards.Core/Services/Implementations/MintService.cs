using System.Data;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Models;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class MintService : IMintService
{
    private readonly Account _authority;
    private readonly Context _context;
    private readonly IStageService _stageService;

    public MintService(Context context, IConfiguration configuration, IStageService stageService)
    {
        _context = context;
        _stageService = stageService;
        var privateKey = configuration["Mint:Authority"];

        _authority = new Wallet(JsonSerializer.Deserialize<int[]>(privateKey)!.Select(i => (byte) i).ToArray(),
            seedMode: SeedMode.Bip39).Account;
    }

    public async Task<byte[]> MintOne(
        Message message,
        byte[] userSignature,
        byte[] mintAccountSignature,
        PublicKey userAddress,
        PublicKey cardMint)
    {
        Transaction solanaTransaction = Transaction.Populate(message);

        if (solanaTransaction.FeePayer.Key != userAddress.Key)
        {
            throw new MintException("WRONG_FEE_PAYER");
        }

        await using IDbContextTransaction dbTransaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

        MintStage stage = await _stageService.GetCurrentStage();

        if (stage == MintStage.None)
        {
            throw new MintException("MINT_NOT_STARTED");
        }

        if (stage != MintStage.Public)
        {
            WhitelistedUserDao user = await _context.WhitelistedUsers
                                          .AsTracking()
                                          .Include(u => u.User)
                                          .Include(u => u.Stage)
                                          .FirstOrDefaultAsync(u => u.User.Address == userAddress.Key) ??
                                      throw new MintException("NOT_ALLOWED_TO_MINT");

            if (user.Stage.StartsAt > DateTime.UtcNow)
            {
                throw new MintException("USER_STAGE_NOT_STARTED");
            }

            if (user.RemainingMints <= 0)
            {
                throw new MintException("NOT_ALLOWED_TO_MINT");
            }

            user.RemainingMints -= 1;

            try
            {
                _context.WhitelistedUsers.Update(user);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new MintException("DB_UPDATE_EXCEPTION");
            }
        }

        solanaTransaction.PartialSign(_authority);
        await dbTransaction.CommitAsync();

        return solanaTransaction.Signatures[0].Signature;
    }
}