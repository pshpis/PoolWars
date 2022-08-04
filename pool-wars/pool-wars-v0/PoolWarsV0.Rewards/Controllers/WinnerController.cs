using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Core.Attributes;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services;

namespace PoolWarsV0.Rewards.Controllers;

[ApiController]
[Route("api/v1/winnerGenerator")]
public class WinnerController : ControllerBase
{
    private readonly IPoolWarRepository _poolWarRepository;

    public WinnerController(IPoolWarRepository poolWarRepository)
    {
        _poolWarRepository = poolWarRepository;
    }

    /// <summary>
    ///     Gets a poolwar for provided pools and generates winner based on pool strengths
    /// </summary>
    /// <param name="pools">Pool addresses</param>
    /// <returns></returns>
    [TokenAuthentication]
    [HttpPost]
    [Route("byPoolAddresses")]
    [ProducesResponseType(typeof(Pool), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Pool>> GenerateWinnerPool([FromQuery] string[] pools)
    {
        throw new NotImplementedException();
    }
}