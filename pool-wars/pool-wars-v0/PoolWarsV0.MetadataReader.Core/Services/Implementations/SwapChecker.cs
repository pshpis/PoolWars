using System.Text.Json;
using Microsoft.Extensions.Configuration;
using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;
using Solnet.Programs;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.MetadataReader.Core.Services.Implementations;

public class SwapChecker : ISwapChecker
{
    private readonly PublicKey _legendarySwap;
    private readonly IMetadataReader _metadataReader;
    private readonly PublicKey _points3Swap;
    private readonly PublicKey _points6Swap;
    private readonly Account _swapAuthority;
    private readonly PublicKey _swapProgramId;

    public SwapChecker(IConfiguration configuration, IMetadataReader metadataReader)
    {
        _metadataReader = metadataReader;
        var privateKey = configuration["Swap:SwapAuthority"];

        _swapAuthority = new Wallet(JsonSerializer.Deserialize<int[]>(privateKey)!.Select(i => (byte) i).ToArray(),
            seedMode: SeedMode.Bip39).Account;

        _legendarySwap = new(configuration["Swap:LegendarySwap"]);
        _points6Swap = new(configuration["Swap:Points6Swap"]);
        _points3Swap = new(configuration["Swap:Points3Swap"]);
        _swapProgramId = new(configuration["Swap:SwapProgramId"]);
    }

    public async Task<byte[]> SignSwap(Message swap)
    {
        var instructions = InstructionDecoder.DecodeInstructions(swap);

        if (instructions.Count != 2)
        {
            throw new SwapCheckerException("BAD_IX_COUNT");
        }

        DecodedInstruction instruction = instructions[1];

        if (instruction.PublicKey.Key != _swapProgramId.Key)
        {
            throw new SwapCheckerException("BAD_PROGRAM_ID");
        }

        try
        {
            PublicKey swapConfig = (PublicKey) instruction.Values["SwapConfig"];

            var sumStrength = 0;

            foreach (PublicKey mint in (IEnumerable<PublicKey>) instruction.Values["Mints"])
            {
                CardMetadata metadata = await _metadataReader.ReadMetadata(mint);
                sumStrength += metadata.Strength;
            }

            int minPoints;

            if (swapConfig.Key == _points3Swap.Key)
            {
                minPoints = 3;
            }
            else if (swapConfig.Key == _points6Swap.Key)
            {
                minPoints = 6;
            }
            else if (swapConfig.Key == _legendarySwap.Key)
            {
                minPoints = 9;
            }
            else
            {
                throw new SwapCheckerException("BAD_SWAP_CONFIG");
            }

            if (sumStrength < minPoints)
            {
                throw new SwapCheckerException("NOT_ENOUGH_POINTS");
            }

            Transaction tx = Transaction.Populate(swap);
            tx.PartialSign(_swapAuthority);
            return tx.Signatures[0].Signature;
        }
        catch (SwapCheckerException)
        {
            throw;
        }
        catch (CreatorAssertionException)
        {
            throw;
        }
        catch (MetadataNotFoundException)
        {
            throw;
        }
        catch (Exception)
        {
            throw new SwapCheckerException("BAD_MESSAGE");
        }
    }
}