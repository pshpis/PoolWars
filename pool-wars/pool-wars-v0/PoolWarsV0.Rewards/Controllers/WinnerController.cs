using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Core.Attributes;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Services;

namespace PoolWarsV0.Rewards.Controllers;

[ApiController]
[Route("api/v1/winnerGenerator")]
public class WinnerController : ControllerBase
{
    private readonly IPoolWarRepository _poolWarRepository;
    private readonly IWinnerGenerator _winnerGenerator;

    public WinnerController(IPoolWarRepository poolWarRepository, IWinnerGenerator winnerGenerator)
    {
        _poolWarRepository = poolWarRepository;
        _winnerGenerator = winnerGenerator;
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
        if (pools.Length != 2)
        {
            return BadRequest(new
            {
                Message = "You need to specify exactly 2 pools"
            });
        }

        try
        {
            Pool winner = await _winnerGenerator.GetWinnerPool(pools.Select(p => new Pool
            {
                Address = p
            }).ToArray());

            return winner;
        }
        catch (WinnerGeneratorException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }
}