namespace UserAdder;

public class UserData
{
    public UserData(string wallet, string role)
    {
        Wallet = wallet;
        Role = role;
    }

    public string Wallet { get; set; }

    public string Role { get; set; }
}