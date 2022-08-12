using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Rewards.Core.Exceptions;
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

    public MintController(IMintService mintService)
    {
        _mintService = mintService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Index([FromBody] MintRequest mintRequest)
    {
        Message message;
        byte[] signature;
        PublicKey user;

        try
        {
            message = Message.Deserialize(Convert.FromBase64String(mintRequest.TransactionMessage));
            signature = Convert.FromBase64String(mintRequest.MessageSignature);
            user = new(mintRequest.WalletAddress);
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
            await _mintService.MintOne(message, signature, user);
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
        return wallet == "4yPHTi9whraHaRvQNH2e1AJezDJvPUTjehyrjKHzPLj5" ? "OG" : "PUBLIC";
    }
}