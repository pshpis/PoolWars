using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.MetadataReader.Core.Services;
using PoolWarsV0.MetadataReader.Models;
using Solnet.Rpc.Models;

namespace PoolWarsV0.MetadataReader.Controllers;

[ApiController]
[Route("api/v1/metadata")]
public class MetadataController : ControllerBase
{
    private readonly ILogger<MetadataController> _logger;
    private readonly IMetadataReader _metadataReader;
    private readonly ISwapChecker _swapChecker;

    public MetadataController(IMetadataReader metadataReader, ILogger<MetadataController> logger, ISwapChecker swapChecker)
    {
        _metadataReader = metadataReader;
        _logger = logger;
        _swapChecker = swapChecker;
    }

    /// <summary>
    ///     Finds metadata by its mint address
    /// </summary>
    /// <param name="mint">mint address</param>
    /// <returns>Card metadata or not found message</returns>
    /// <response code="200">Metadata item</response>
    /// <response code="404">Not found message</response>
    [HttpPost]
    [Route("card")]
    [ProducesResponseType(typeof(CardMetadata), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async ValueTask<ActionResult<CardMetadata>> GetCardMetadata([FromQuery] string mint)
    {
        _logger.LogInformation("Invoked /api/v1/metadata/card");

        try
        {
            CardMetadata metadata = await _metadataReader.ReadMetadata(mint);
            return Ok(metadata);
        }
        catch (MetadataNotFoundException)
        {
            return NotFound(new
            {
                Message = "Card metadata not found"
            });
        }
        catch (CreatorAssertionException)
        {
            return BadRequest(new
            {
                Message = "Found card metadata but verified creator is not in the list of allowed creators"
            });
        }
    }

    /// <summary>
    ///     Checks swap message and signs if it not violates swap rules
    /// </summary>
    /// <param name="swap">Swap message wrapper</param>
    /// <returns>Signature or error message</returns>
    [HttpPost]
    [Route("signSwap")]
    public async Task<ActionResult<string>> GetBase64SwapSignature([FromBody] SwapRequest swap)
    {
        _logger.LogInformation("Invoked /api/v1/metadata/signSwap");
        Message message;

        try
        {
            message = Message.Deserialize(Convert.FromBase64String(swap.Message));
        }
        catch (Exception)
        {
            return BadRequest(new
            {
                Message = "BAD_MESSAGE"
            });
        }

        try
        {
            var signature = await _swapChecker.SignSwap(message);

            return Convert.ToBase64String(signature);
        }
        catch (MetadataNotFoundException)
        {
            return NotFound(new
            {
                Message = "Card metadata not found"
            });
        }
        catch (CreatorAssertionException)
        {
            return BadRequest(new
            {
                Message = "Found card metadata but verified creator is not in the list of allowed creators"
            });
        }
        catch (SwapCheckerException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }
}