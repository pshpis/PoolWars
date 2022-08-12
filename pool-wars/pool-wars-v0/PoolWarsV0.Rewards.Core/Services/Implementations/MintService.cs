using System.Data;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using PoolWarsV0.Data;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Rewards.Core.Exceptions;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class MintService : IMintService
{
    private readonly Account _authority;
    private readonly Context _context;
    private readonly ITransactionSender _transactionSender;

    public MintService(ITransactionSender transactionSender, Context context, IConfiguration configuration)
    {
        _transactionSender = transactionSender;
        _context = context;
        var privateKey = configuration["Mint:Authority"];

        _authority = new Wallet(JsonSerializer.Deserialize<int[]>(privateKey)!.Select(i => (byte) i).ToArray(),
            seedMode: SeedMode.Bip39).Account;
    }

    public async Task MintOne(Message message, byte[] userSignature, byte[] mintAccountSignature, PublicKey userAddress,
        PublicKey cardMint)
    {
        Transaction solanaTransaction = Transaction.Populate(message);

        if (solanaTransaction.FeePayer.Key != userAddress.Key)
        {
            throw new MintException("WRONG_FEE_PAYER");
        }

        await using IDbContextTransaction dbTransaction = await _context.Database.BeginTransactionAsync(IsolationLevel.Serializable);

        try
        {
            solanaTransaction.AddSignature(userAddress, userSignature);
            solanaTransaction.AddSignature(cardMint, mintAccountSignature);
            solanaTransaction.PartialSign(_authority);
            await _transactionSender.Send(solanaTransaction);
        }
        catch (TransactionSenderException e)
        {
            throw new MintException(e.Message, e);
        }

        await dbTransaction.CommitAsync();
    }
}