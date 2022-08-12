using System.Text;
using Solnet.Programs;
using Solnet.Rpc.Builders;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace ElderSwaps.Tests;

public partial class DevnetTests
{
    [Test]
    public void TestInitialize()
    {
        const int configSize = 153;

        var id = new byte[]
        {
            1
        };

        // 2000 rare
        // 2500 epic
        // 2333 legendary

        const long supply = 2500L;
        var metadataPrefix = Encoding.UTF8.GetBytes("https://elderkatts.com/points6/");
        var symbol = Encoding.UTF8.GetBytes("POINTS6");

        var metadataPrefixPadded = new byte[32];
        Array.Fill<byte>(metadataPrefixPadded, value: 0);
        var symbolPadded = new byte[8];
        Array.Fill<byte>(symbolPadded, value: 0);

        Array.Copy(
            metadataPrefix,
            sourceIndex: 0,
            metadataPrefixPadded,
            destinationIndex: 0,
            metadataPrefix.Length);

        Array.Copy(
            symbol,
            sourceIndex: 0,
            symbolPadded,
            destinationIndex: 0,
            symbol.Length
        );

        var supplyBytes = BitConverter.GetBytes(supply);
        Account swapConfig = new();

        PublicKey.TryFindProgramAddress(
            new[]
            {
                Encoding.UTF8.GetBytes("mint_authority"),
                swapConfig.PublicKey.KeyBytes
            },
            _programId,
            out PublicKey mintAuthority,
            out _
        );

        var instructionData = id
            .Concat(supplyBytes)
            .Concat(metadataPrefixPadded)
            .Concat(symbolPadded)
            .Concat(_swapAuthority.PublicKey.KeyBytes)
            .Concat(_royaltyWallet.PublicKey.KeyBytes)
            .Concat(_adminAccount.PublicKey.KeyBytes)
            .ToArray();

        Assert.That(instructionData, Has.Length.EqualTo(1 + 144));

        var metadata = new[]
        {
            AccountMeta.Writable(_feePayer, isSigner: true),
            AccountMeta.Writable(swapConfig, isSigner: true),
            AccountMeta.Writable(mintAuthority, isSigner: false),
            AccountMeta.ReadOnly(SysVars.RentKey, isSigner: false),
            AccountMeta.ReadOnly(SystemProgram.ProgramIdKey, isSigner: false)
        };

        var rent = _client.GetMinimumBalanceForRentExemption(configSize).Result;

        TransactionInstruction init = SystemProgram.CreateAccount(
            _feePayer,
            swapConfig,
            rent,
            configSize,
            _programId
        );

        TransactionInstruction ix = TransactionInstructionFactory.Create(_programId, metadata, instructionData);

        Transaction tx = new()
        {
            FeePayer = _feePayer,
            RecentBlockHash = _client.GetLatestBlockHash().Result.Value.Blockhash
        };

        tx.Add(init).Add(ix);
        var response = _client.SendTransaction(tx.Build(new[] {_feePayer, swapConfig}));// _client.SimulateTransaction(tx.Build(new[] {_feePayer, swapConfig}), sigVerify: true);
        Assert.That(response.WasSuccessful, Is.True);
    }
}