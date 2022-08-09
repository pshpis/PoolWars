using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using PoolWarsV0.Core.Attributes;
using PoolWarsV0.Data;
using PoolWarsV0.Data.Models;

namespace PoolWarsV0.Core.Middleware;

public sealed class UserAuthenticationMiddleware : IDisposable
{
    private readonly Context _context;
    private readonly RequestDelegate _next;
    private readonly IServiceScope _scope;

    public UserAuthenticationMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
    {
        _next = next;
        _scope = serviceProvider.CreateScope();
        _context = _scope.ServiceProvider.GetRequiredService<Context>();
    }

    public void Dispose()
    {
        _scope.Dispose();
    }

    public async Task Invoke(HttpContext context)
    {
        Endpoint? endpoint = context.Features.Get<IEndpointFeature>()?.Endpoint;
        UserAuthenticationAttribute? attribute = endpoint?.Metadata.GetMetadata<UserAuthenticationAttribute>();

        if (attribute is { })
        {
            IQueryCollection? queryValues = context.Request.Query;

            if (!queryValues.TryGetValue("token", out StringValues tokens))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }

            PrismaUser? user = await GetUserByToken(tokens[0]);

            if (user is null)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            ClaimsIdentity? userId = context.User.Identity as ClaimsIdentity;
            userId?.AddClaim(new("wallet", user.WalletAddress));
        }

        await _next(context);
    }

    private async Task<PrismaUser?> GetUserByToken(string token)
    {
        DateTime start = DateTime.UtcNow.Subtract(TimeSpan.FromDays(1));

        return await _context.PrismaUsers
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.AuthToken == token && u.AuthTokenCreated > start);
    }
}