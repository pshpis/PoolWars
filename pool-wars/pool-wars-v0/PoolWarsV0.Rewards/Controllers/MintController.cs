using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Models;
using PoolWarsV0.Rewards.Core.Services;
using PoolWarsV0.Rewards.Models;
using Solnet.Rpc.Models;
using Solnet.Wallet;

namespace PoolWarsV0.Rewards.Controllers;

[ApiController]
[Route("api/v1/mint")]
public class MintController : ControllerBase
{
    private readonly IMintService _mintService;
    private readonly IStageService _stageService;

    public MintController(IMintService mintService, IStageService stageService)
    {
        _mintService = mintService;
        _stageService = stageService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Index([FromBody] MintRequest mintRequest)
    {
        Message message;
        byte[] signature;
        byte[] mintSignature;
        PublicKey user;
        PublicKey cardMint;

        try
        {
            message = Message.Deserialize(Convert.FromBase64String(mintRequest.TransactionMessage));
            signature = Convert.FromBase64String(mintRequest.MessageSignature);
            mintSignature = Convert.FromBase64String(mintRequest.MintAccountSignature);
            user = new(mintRequest.WalletAddress);
            cardMint = new(mintRequest.CardMint);
        }
        catch (Exception)
        {
            return BadRequest(new
            {
                Message = "BAD_REQUEST_BODY"
            });
        }

        try
        {
            await _mintService.MintOne(message, signature, mintSignature, user, cardMint);
            return Ok();
        }
        catch (MintException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }

    [HttpGet]
    [Route("walletStage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> GetWalletStage([FromQuery] string wallet)
    {
        PublicKey user;

        try
        {
            user = new(wallet);
        }
        catch (Exception)
        {
            return BadRequest(new
            {
                Message = "BAD_REQUEST_FIELDS"
            });
        }

        MintStage stage = await _stageService.GetWalletStage(user);

        return stage switch
        {
            MintStage.Whitelist => "WL",
            MintStage.Og => "OG",
            MintStage.Public => "PUBLIC",
            MintStage.None => "NONE",
            _ => throw new ArgumentOutOfRangeException(wallet)
        };
    }

    [HttpGet]
    [Route("mintStage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> GetMintStage()
    {
        MintStage stage = await _stageService.GetCurrentStage();

        return stage switch
        {
            MintStage.Whitelist => "WL",
            MintStage.Og => "OG",
            MintStage.Public => "PUBLIC",
            MintStage.None => "NONE",
            _ => throw new("BAD_ENUM_STATE")
        };
    }
}