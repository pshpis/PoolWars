using System.Text;
using Solana.Metaplex;
using Solnet.Programs;
using Solnet.Rpc.Builders;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace ElderSwaps.Tests;

public partial class DevnetTests
{
    [Test]
    public void TestSwap()
    {
        var id = new byte[]
        {
            2
        };

        const byte tokenAmount = 6;
        var tokenAmountBytes = new[] {tokenAmount};

        Account mintAccount = new();
        PublicKey swapDestination = _swapper;
        PublicKey destinationTokenAccount = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(swapDestination, mintAccount);

        PublicKey.TryFindProgramAddress(
            new[]
            {
                Encoding.UTF8.GetBytes("metadata"),
                MetadataProgram.ProgramIdKey.KeyBytes,
                mintAccount.PublicKey.KeyBytes
            },
            MetadataProgram.ProgramIdKey,
            out PublicKey tokenMetadata,
            out _
        );

        PublicKey.TryFindProgramAddress(
            new[]
            {
                Encoding.UTF8.GetBytes("mint_authority"),
                _mainSwapConfig.PublicKey.KeyBytes
            },
            _programId,
            out PublicKey mintAuthority,
            out _
        );

        PublicKey tokenMint1 = new("Fkthc6c5jQG3NKan48fLpyaB1tracSB4War6HN5QwYQm");
        PublicKey tokenMint2 = new("FrojFYKbkwCbW28HmFprTPUKyrENutbBo42GYnwRqANw");
        PublicKey tokenMint3 = new("dRqmotmBGppNjbi48GRwh4SMMaejNPVNuHepBShzgRk");
        PublicKey tokenMint4 = new("8XzfBxkkUqGnAtx1LatQGF8UMsnypjj3pFqvQvbMnoD8");
        PublicKey tokenMint5 = new("6u3hez3Vuud24GumxspfRGS1aXt5SJDDZbgtd7h9Rnjt");
        PublicKey tokenMint6 = new("GMZE5X1iKtUy5zUvq5Kre3eEyswkkbqr8XsbF8Ecpxkx");

        PublicKey tokenAcc1 = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(_swapper, tokenMint1);
        PublicKey tokenAcc2 = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(_swapper, tokenMint2);
        PublicKey tokenAcc3 = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(_swapper, tokenMint3);
        PublicKey tokenAcc4 = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(_swapper, tokenMint4);
        PublicKey tokenAcc5 = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(_swapper, tokenMint5);
        PublicKey tokenAcc6 = AssociatedTokenAccountProgram.DeriveAssociatedTokenAccount(_swapper, tokenMint6);

        var instructionData = id.Concat(tokenAmountBytes)
            .ToArray();

        Assert.That(instructionData, Has.Length.EqualTo(1 + 1));

        var metadata = new[]
        {
            AccountMeta.ReadOnly(_swapper, isSigner: true),
            AccountMeta.Writable(_mainSwapConfig, isSigner: false),
            AccountMeta.Writable(mintAccount, isSigner: true),
            AccountMeta.Writable(swapDestination, isSigner: false),
            AccountMeta.Writable(destinationTokenAccount, isSigner: false),
            AccountMeta.Writable(tokenMetadata, isSigner: false),
            AccountMeta.ReadOnly(mintAuthority, isSigner: false),
            AccountMeta.ReadOnly(SystemProgram.ProgramIdKey, isSigner: false),
            AccountMeta.ReadOnly(SysVars.RentKey, isSigner: false),
            AccountMeta.ReadOnly(TokenProgram.ProgramIdKey, isSigner: false),
            AccountMeta.ReadOnly(AssociatedTokenAccountProgram.ProgramIdKey, isSigner: false),
            AccountMeta.ReadOnly(MetadataProgram.ProgramIdKey, isSigner: false),
            AccountMeta.Writable(_feePayer, isSigner: true),
            AccountMeta.ReadOnly(_swapAuthority, isSigner: true),
            AccountMeta.ReadOnly(_adminAccount, isSigner: false),
            AccountMeta.ReadOnly(_royaltyWallet, isSigner: false),
            AccountMeta.Writable(tokenAcc1, isSigner: false),
            AccountMeta.Writable(tokenMint1, isSigner: false),

            AccountMeta.Writable(tokenAcc2, isSigner: false),
            AccountMeta.Writable(tokenMint2, isSigner: false),

            AccountMeta.Writable(tokenAcc3, isSigner: false),
            AccountMeta.Writable(tokenMint3, isSigner: false),

            AccountMeta.Writable(tokenAcc4, isSigner: false),
            AccountMeta.Writable(tokenMint4, isSigner: false),

            AccountMeta.Writable(tokenAcc5, isSigner: false),
            AccountMeta.Writable(tokenMint5, isSigner: false),

            AccountMeta.Writable(tokenAcc6, isSigner: false),
            AccountMeta.Writable(tokenMint6, isSigner: false)

            // AccountMeta.Writable(tokenAcc7, isSigner: false),
            // AccountMeta.Writable(tokenMint7, isSigner: false),

            // AccountMeta.Writable(tokenAcc8, isSigner: false),
            // AccountMeta.Writable(tokenMint8, isSigner: false),

            // AccountMeta.Writable(tokenAcc9, isSigner: false),
            // AccountMeta.Writable(tokenMint9, isSigner: false)
        };

        TransactionInstruction ix = TransactionInstructionFactory.Create(_programId, metadata, instructionData);

        Transaction tx = new()
        {
            FeePayer = _feePayer,
            RecentBlockHash = _client.GetLatestBlockHash().Result.Value.Blockhash
        };

        tx.Add(ix);
        tx.PartialSign(_feePayer);
        tx.PartialSign(_swapper);
        tx.PartialSign(mintAccount);
        tx.PartialSign(_swapAuthority);
        var txBytes = tx.Serialize();
        var response = _client.SimulateTransaction(txBytes, sigVerify: true);
        Assert.That(response.WasSuccessful, Is.True);
    }
}