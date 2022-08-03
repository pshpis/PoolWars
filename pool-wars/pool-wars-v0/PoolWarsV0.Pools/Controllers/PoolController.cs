using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.MetadataReader.Core.Exceptions;
using PoolWarsV0.MetadataReader.Core.Models;
using PoolWarsV0.MetadataReader.Core.Services;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Pools.Models;
using Solnet.Rpc.Models;

namespace PoolWarsV0.Pools.Controllers;

[ApiController]
[Route("api/v1/pools")]
public class PoolController : ControllerBase
{
    private readonly IMetadataReader _metadataReader;
    private readonly IPoolService _poolService;

    public PoolController(IMetadataReader metadataReader, IPoolService poolService)
    {
        _metadataReader = metadataReader;
        _poolService = poolService;
    }

    /// <summary>
    ///     Gets pool state
    /// </summary>
    /// <returns>Pool state</returns>
    /// <response code="200">Pool item</response>
    /// <response code="404">Not existent pool</response>
    [HttpGet]
    [Route("state")]
    [ProducesResponseType(typeof(PoolWar), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PoolState>> GetPoolState([FromQuery] string pool, [FromQuery] string? user)
    {
        try
        {
            PoolState poolState = await _poolService.GetPoolStrengthAsync(pool, user);
            return poolState;
        }
        catch (PoolServiceException)
        {
            return NotFound(new
            {
                Message = "Pool not found"
            });
        }
    }

    /// <summary>
    ///     Deposit card to pool
    /// </summary>
    /// <returns>Pool state</returns>
    /// <response code="200">Pool state</response>
    /// <response code="404">Not existent pool</response>
    /// <response code="400">Bad parameter</response>
    [HttpPost]
    [Route("deposit")]
    [ProducesResponseType(typeof(PoolWar), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PoolState>> DepositCard([FromBody] DepositCardDto depositCard)
    {
        CardMetadata metadata;
        Pool pool;
        Message message;
        byte[] signature;

        try
        {
            metadata = await _metadataReader.ReadMetadata(depositCard.CardMintAddress);

            pool = new()
            {
                Address = depositCard.PoolAddress
            };

            message = Message.Deserialize(Convert.FromBase64String(depositCard.TransactionMessage));
            signature = Convert.FromBase64String(depositCard.MessageSignature);
        }
        catch (Exception)
        {
            return BadRequest(new
            {
                Message = "Bad parameters"
            });
        }

        try
        {
            PoolState poolState = await _poolService.DepositCardAsync(metadata, pool, message, signature);
            return poolState;
        }
        catch (CreatorAssertionException)
        {
            return BadRequest(new
            {
                Message = "Creator is not allowed"
            });
        }
        catch (MetadataNotFoundException)
        {
            return NotFound(new
            {
                Message = "Metadata not found"
            });
        }
        catch (TransactionAssertionException)
        {
            return BadRequest(new
            {
                Message = "Bad transaction fields"
            });
        }
        catch (TransactionSenderException)
        {
            return BadRequest(new
            {
                Message = "Bad transaction data"
            });
        }
        catch (PoolServiceException e)
        {
            return e.Message switch
            {
                "POOL_NOT_FOUND" => new NotFoundObjectResult(new
                {
                    Message = "Pool not found"
                }),
                "POOL_WAR_ENDED" => new BadRequestObjectResult(new
                {
                    Message = "Pool war ended"
                }),
                "DB_UPDATE_ERROR" => new ConflictResult(),

                _ => throw new ArgumentException("Unknown error")
            };
        }
    }
}