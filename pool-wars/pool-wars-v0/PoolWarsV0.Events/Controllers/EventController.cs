using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.Core.Attributes;
using PoolWarsV0.Events.Core.Models;
using PoolWarsV0.Events.Core.Services;

namespace PoolWarsV0.Events.Controllers;

[ApiController]
[Route("api/v1/events")]
public class EventController : ControllerBase
{
    private readonly IEventRepository _repository;

    public EventController(IEventRepository repository)
    {
        _repository = repository;
    }

    /// <summary>
    ///     Reads authorized user's events
    /// </summary>
    /// <param name="token">access token</param>
    /// <param name="page">Page</param>
    /// <param name="count">Items on page</param>
    /// <returns>List of events</returns>
    [HttpGet]
    [UserAuthentication]
    [ProducesResponseType(typeof(IEnumerable<Event>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<object>>> Index([FromQuery] string token,
        [FromQuery] [Range(minimum: 1, int.MaxValue)]
        int page, [FromQuery] [Range(minimum: 1, maximum: 20)] int count)
    {
        if (HttpContext.User.Identity is not ClaimsIdentity identity)
        {
            return Unauthorized();
        }

        Claim? claim = identity.Claims.FirstOrDefault(c => c.Type == "wallet");

        if (claim is null)
        {
            return BadRequest(new
            {
                Mesage = "Bad access token"
            });
        }

        var from = (page - 1) * count;

        var events = await _repository.GetEvents(claim.Value)
            .Skip(from)
            .Take(count)
            .Cast<object>()
            .ToListAsync();

        return events;
    }
}