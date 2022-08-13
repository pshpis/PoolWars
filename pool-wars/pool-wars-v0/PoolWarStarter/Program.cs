using System.Net.Http.Json;
using PoolWarsV0.Pools.Models;

using HttpClient client = new();
client.DefaultRequestHeaders.TryAddWithoutValidation("POOLTOKEN", "+4L_cmerxMqA");

for (var i = 1; i < 1000; i++)
{
    PoolWarDto poolWar = new()
    {
        Description = $"Pool War #{i}",
        End = (long) Math.Floor((DateTime.UtcNow.AddHours(3) - DateTime.UnixEpoch).TotalSeconds)
    };

    HttpResponseMessage response = await client.PostAsJsonAsync("https://elderkatts.com/api/v1/wars/create", poolWar);

    if (response.IsSuccessStatusCode)
    {
    }
}