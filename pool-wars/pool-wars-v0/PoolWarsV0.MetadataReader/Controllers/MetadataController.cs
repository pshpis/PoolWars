using Microsoft.AspNetCore.Mvc;
using PoolWarsV0.MetadataReader.Core.Models;

namespace PoolWarsV0.MetadataReader.Controllers;

[ApiController]
[Route("api/v1/metadata")]
public class MetadataController : ControllerBase
{
    [HttpPost]
    [Route("card")]
    public async ValueTask<CardMetadata> GetCardMetadata([FromQuery] string mint)
    {
        throw new NotImplementedException();
    }
}