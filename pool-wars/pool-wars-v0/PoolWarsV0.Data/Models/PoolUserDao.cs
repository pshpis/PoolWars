namespace PoolWarsV0.Data.Models;

public class PoolUserDao : SolanaAddress
{
    public ICollection<PoolDepositDao> Deposits { get; set; } = null!;
}