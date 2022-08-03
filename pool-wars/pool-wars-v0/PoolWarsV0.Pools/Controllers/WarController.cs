using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Core.Attributes;
using PoolWarsV0.Pools.Core.Exceptions;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Pools.Models;

namespace PoolWarsV0.Pools.Controllers;

[ApiController]
[Route("api/v1/wars")]
public class WarController : ControllerBase
{
    private readonly IPoolWarRepository _poolWarRepository;

    public WarController(IPoolWarRepository poolWarRepository)
    {
        _poolWarRepository = poolWarRepository;
    }

    /// <summary>
    ///     Creates new Pool War
    /// </summary>
    /// <param name="poolWar">PoolWar object</param>
    /// <returns>Card metadata or not found message</returns>
    /// <response code="200">Metadata item</response>
    /// <response code="400">Bad request</response>
    /// <response code="403">Insufficient permissions for this action</response>
    /// <response code="500">Error while creating pool war</response>
    [Route("create")]
    [HttpPost]
    [TokenAuthentication]
    [ProducesResponseType(typeof(PoolWar), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PoolWar>> Create([FromBody] PoolWarDto poolWar)
    {
        try
        {
            DateTime end = DateTime.UnixEpoch.AddSeconds(poolWar.End);

            if (end < DateTime.UtcNow)
            {
                return BadRequest(new
                {
                    Message = "Pool war must end after present moment"
                });
            }

            if (poolWar.Description is null)
            {
                return await _poolWarRepository.StartPoolWarAsync(end);
            }

            return await _poolWarRepository.StartPoolWarAsync(poolWar.Description, end);
        }
        catch (PoolWarRepositoryException)
        {
            HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

            return new ObjectResult(new
            {
                Message = "Could not create pool war"
            });
        }
    }
}