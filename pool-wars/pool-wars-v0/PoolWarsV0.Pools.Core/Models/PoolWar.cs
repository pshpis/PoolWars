namespace PoolWarsV0.Pools.Core.Models;

public class PoolWar
{
    public string? Description { get; set; }

    public ICollection<Pool> Pools { get; set; } = new List<Pool>();
}