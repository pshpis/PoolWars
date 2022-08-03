using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using PoolWarsV0.Core.Attributes;

namespace PoolWarsV0.Core.Middleware;

public class TokenAuthenticationMiddleware
{
    private const string HeaderName = "POOLTOKEN";
    private readonly string _adminToken;

    private readonly RequestDelegate _next;

    public TokenAuthenticationMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _adminToken = configuration["PoolWars:AdminToken"] ?? string.Empty;
    }

    public async Task Invoke(HttpContext context)
    {
        Endpoint? endpoint = context.Features.Get<IEndpointFeature>()?.Endpoint;
        TokenAuthenticationAttribute? attribute = endpoint?.Metadata.GetMetadata<TokenAuthenticationAttribute>();

        if (attribute is { })
        {
            KeyValuePair<string, StringValues> header = context.Request.Headers.FirstOrDefault(h => h.Key == HeaderName);

            if (header.Key != HeaderName || header.Value[0] != _adminToken)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }
        }

        await _next(context);
    }
}