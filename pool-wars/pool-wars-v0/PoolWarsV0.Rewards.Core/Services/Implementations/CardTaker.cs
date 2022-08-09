using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Rewards.Core.Exceptions;
using Solnet.Programs;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Core.Services.Implementations;

public class CardTaker : ICardTaker
{
    private readonly Context _context;
    private readonly ITransactionSender _transactionSender;

    public CardTaker(Context context, ITransactionSender transactionSender)
    {
        _context = context;
        _transactionSender = transactionSender;
    }

    public async Task TakeCard(Message message, byte[] signature, PublicKey cardMint, PublicKey poolAddress)
    {
        var cardMintString = cardMint.Key;

        UserResultCard cardLink = await _context.UserResultCards
                                      .AsTracking()
                                      .Include(r => r.Link)
                                      .ThenInclude(r => r.User)
                                      .Include(r => r.Card)
                                      .ThenInclude(c => c.CardMint)
                                      .FirstOrDefaultAsync(r => r.Card.CardMint.Address == cardMintString && !r.Given) ??
                                  throw new CardTakerException("CARD_NOT_FOUND_OR_TAKEN");

        PublicKey user = new(cardLink.Link.User.Address);
        PublicKey mint = new(cardLink.Card.CardMint.Address);

        var instructions = InstructionDecoder.DecodeInstructions(message);
        Pool pool = AssertInstructionsAreValid(instructions, user, mint);

        PoolDao poolDao = await _context.Pools
                              .AsNoTracking()
                              .FirstOrDefaultAsync(p => p.Address == pool.Address) ??
                          throw new CardTakerException("POOL_NOT_FOUND");

        PoolWarEventDao eventDao = await _context.PoolWarsEvents
                                       .AsNoTracking()
                                       .Include(e => e.User)
                                       .FirstOrDefaultAsync(e => e.User.Address == user.Key && e.PoolAddress == pool.Address) ??
                                   throw new CardTakerException("EVENT_NOT_FOUND");

        var takenCards = eventDao.TakenCards.Split(' ');

        Transaction tx = Transaction.Populate(message);

        if (tx.FeePayer != user)
        {
            throw new CardTakerException("WRONG_FEE_PAYER");
        }

        tx.AddSignature(user, signature);
        tx.PartialSign(new Account(poolDao.PrivateKey, poolDao.Address));

        await using IDbContextTransaction transaction = await _context.Database.BeginTransactionAsync();

        cardLink.Given = true;
        eventDao.TakenCards = string.Join(" ", takenCards.Concat(new[] {mint.Key}));
        _context.UserResultCards.Update(cardLink);
        _context.PoolWarsEvents.Update(eventDao);
        await _context.SaveChangesAsync();

        try
        {
            await _transactionSender.Send(tx);
        }
        catch (TransactionSenderException)
        {
            throw new CardTakerException("TRANSACTION_SEND_ERROR");
        }

        await transaction.CommitAsync();
    }

    private static Pool AssertInstructionsAreValid(IReadOnlyList<DecodedInstruction> instructions, PublicKey user, PublicKey mint)
    {
        int index;

        if (instructions.Count == 1)
        {
            index = 0;
        }
        else if (instructions.Count == 2)
        {
            if (instructions[0].PublicKey == AssociatedTokenAccountProgram.ProgramIdKey &&
                instructions[0].InstructionName == "Create Associated Token Account" &&
                instructions[0].Values["Payer"] as PublicKey == user)
            {
                index = 1;
            }
            else
            {
                throw new CardTakerException("WRONG_INSTRUCTIONS");
            }
        }
        else
        {
            throw new CardTakerException("WRONG_INSTRUCTIONS");
        }

        if (instructions[index].PublicKey != TokenProgram.ProgramIdKey)
        {
            throw new CardTakerException("WRONG_INSTRUCTIONS");
        }

        if (instructions[index].InstructionName != "Transfer Checked")
        {
            throw new CardTakerException("WRONG_INSTRUCTIONS");
        }

        if (instructions[index].Values["Mint"] as PublicKey != mint)
        {
            throw new CardTakerException("WRONG_INSTRUCTIONS");
        }

        PublicKey destination = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(user, mint);

        if (instructions[index].Values["Destination"] as PublicKey != destination)
        {
            throw new CardTakerException("WRONG_INSTRUCTIONS");
        }

        return new()
        {
            Address = (instructions[index].Values["Authority"] as PublicKey)!.Key
        };
    }
}