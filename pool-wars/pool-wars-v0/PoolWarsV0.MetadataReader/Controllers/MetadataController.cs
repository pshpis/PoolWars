using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.MetadataReader.Core.Services;

namespace PoolWarsV0.MetadataReader.Controllers;

[ApiController]
[Route("api/v1/metadata")]
public class MetadataController : ControllerBase
{
    private readonly ILogger<MetadataController> _logger;
    private readonly IMetadataReader _metadataReader;

    public MetadataController(IMetadataReader metadataReader, ILogger<MetadataController> logger)
    {
        _metadataReader = metadataReader;
        _logger = logger;
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
}