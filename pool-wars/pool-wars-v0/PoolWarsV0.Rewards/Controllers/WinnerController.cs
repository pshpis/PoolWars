using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Core.Attributes;
using PoolWarsV0.Pools.Core.Models;
using PoolWarsV0.Pools.Core.Services;
using PoolWarsV0.Rewards.Core.Exceptions;
using PoolWarsV0.Rewards.Core.Models;
using PoolWarsV0.Rewards.Core.Services;

namespace PoolWarsV0.Rewards.Controllers;

[ApiController]
[Route("api/v1/winnerData")]
public class WinnerController : ControllerBase
{
    private readonly IPoolWarRepository _poolWarRepository;
    private readonly IRewardDistributor _rewardDistributor;
    private readonly IWinnerGenerator _winnerRespository;

    public WinnerController(IPoolWarRepository poolWarRepository, IWinnerGenerator winnerRespository,
        IRewardDistributor rewardDistributor)
    {
        _poolWarRepository = poolWarRepository;
        _winnerRespository = winnerRespository;
        _rewardDistributor = rewardDistributor;
    }

    /// <summary>
    ///     Gets a poolwar for provided pools and generates winner based on pool strengths
    /// </summary>
    /// <param name="pools">Pool addresses</param>
    /// <returns></returns>
    [TokenAuthentication]
    [HttpPost]
    [Route("generate")]
    [ProducesResponseType(typeof(PoolWarResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PoolWarResult>> GenerateWinnerPool([FromQuery] string[] pools)
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
            WinnerData winner = await _winnerRespository.GetWinnerPool(pools.Select(p => new Pool
            {
                Address = p
            }).ToArray());

            PoolWarResult result = await _rewardDistributor.DistributeRewards(winner);
            return result;
        }
        catch (WinnerGeneratorException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }

    [HttpGet]
    [Route("getDetailed")]
    [ProducesResponseType(typeof(PoolWarResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PoolWarResult>> GetPoolWarResult([FromQuery] string user, [FromQuery] string pool)
    {
        try
        {
            PoolUserAdapter poolBody = new()
            {
                Address = pool,
                User = user
            };

            return await _winnerRespository.GetPoolWarResult(poolBody);
        }
        catch (WinnerGeneratorException e)
        {
            return BadRequest(new
            {
                e.Message
            });
        }
    }

    [HttpGet]
    [Route("get")]
    [ProducesResponseType(typeof(PoolWarResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PoolWarResult>> GetPoolWarResult([FromQuery] string pool)
    {
        try
        {
            Pool poolBody = new()
            {
                Address = pool
            };

            return await _winnerRespository.GetPoolWarResult(poolBody);
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