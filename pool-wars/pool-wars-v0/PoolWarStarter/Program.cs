using HttpClient client = new();
client.DefaultRequestHeaders.TryAddWithoutValidation("POOLTOKEN", "+4L_cmerxMqA");

TimeSpan delay = new DateTime(year: 2022, month: 8, day: 14, hour: 4, minute: 0, second: 5, DateTimeKind.Utc) - DateTime.UtcNow;

Console.WriteLine("Waiting...");
await Task.Delay(delay);

HttpResponseMessage response = await client.PostAsync(
    "https://elderkatts.com/api/v1/winnerData/generate?pools=21wS5GhECzRwSuGXnjWqufy8DTpTnd5emejsnL1Q9y2H&pools=8FohkAFVHobeGdU2oBzJ5hD1dae3K3K53uGEoyujZ3K",
    content: null);

var body = await response.Content.ReadAsStringAsync();

Console.WriteLine(body);