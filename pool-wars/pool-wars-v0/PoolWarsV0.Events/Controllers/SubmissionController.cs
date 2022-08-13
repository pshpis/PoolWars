using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Events.Core.Exceptions;
using PoolWarsV0.Events.Core.Services;
using Solnet.Wallet;

namespace PoolWarsV0.Events.Controllers;

[ApiController]
[Route("api/v1/submissions")]
public class SubmissionController : ControllerBase
{
    private readonly ISubmissionsService _submissionsService;

    public SubmissionController(ISubmissionsService submissionsService)
    {
        _submissionsService = submissionsService;
    }

    [HttpPost]
    [Route("submit")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> SubmitWallet([FromQuery] string wallet, [FromQuery] string? dsId)
    {
        PublicKey userWallet;

        try
        {
            if (!PublicKey.IsValid(wallet))
            {
                throw new ArgumentException(string.Empty, nameof(wallet));
            }

            if (dsId is null)
            {
                throw new ArgumentNullException(nameof(dsId));
            }

            userWallet = new(wallet);
        }
        catch (Exception)
        {
            return BadRequest(new
            {
                Message = "BAD_ARGS"
            });
        }

        try
        {
            await _submissionsService.SubmitWallet(userWallet, dsId);
            return NoContent();
        }
        catch (SubmissionException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }

    [HttpGet]
    [Route("status")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(bool), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<bool>> GetStatus([FromQuery] string wallet)
    {
        PublicKey userWallet;

        try
        {
            if (!PublicKey.IsValid(wallet))
            {
                throw new ArgumentException(string.Empty, nameof(wallet));
            }

            userWallet = new(wallet);
        }
        catch (Exception)
        {
            return BadRequest(new
            {
                Message = "BAD_WALLET_ADDRESS"
            });
        }

        try
        {
            return await _submissionsService.Status(userWallet);
        }
        catch (SubmissionException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }
}