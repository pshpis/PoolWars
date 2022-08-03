using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Models;
using Solnet.Programs;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Pools.Core.Services.Implementations;

public class TransactionAssertionService : ITransactionAssertionService
{
    public PoolUserAdapter AssertMessageValid(Message message, CardMetadata metadata, Pool pool)
    {
        var instructions = InstructionDecoder.DecodeInstructions(message);

        if (instructions is null)
        {
            throw new TransactionAssertionException();
        }

        if (instructions.Count != 2)
        {
            throw new TransactionAssertionException();
        }

        DecodedInstruction transferInstruction = instructions[1];

        if (transferInstruction.InstructionName != "Transfer Checked")
        {
            throw new TransactionAssertionException();
        }

        try
        {
            var source = ((PublicKey) transferInstruction.Values["Authority"]).Key;
            var destination = ((PublicKey) transferInstruction.Values["Destination"]).Key;
            var mint = ((PublicKey) transferInstruction.Values["Mint"]).Key;
            var amount = (ulong) transferInstruction.Values["Amount"];

            if (mint != metadata.Mint)
            {
                throw new TransactionAssertionException();
            }

            PublicKey calculatedDestination =
                AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(new(pool.Address), new(mint));

            if (calculatedDestination.Key != destination)
            {
                throw new TransactionAssertionException();
            }

            if (amount != 1)
            {
                throw new TransactionAssertionException();
            }

            return new()
            {
                Address = pool.Address,
                User = source
            };
        }
        catch (Exception)
        {
            throw new TransactionAssertionException();
        }
    }
}