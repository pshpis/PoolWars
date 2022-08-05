using Solnet.Rpc;
using Solnet.Wallet;

namespace ElderSwaps.Tests;

public partial class DevnetTests
{
    private Account _adminAccount = null!;

    private IRpcClient _client = null!;
    private Account _feePayer = null!;
    private Account _mainSwapConfig = null!;
    private PublicKey _programId = null!;
    private Account _royaltyWallet = null!;
    private Account _swapAuthority = null!;
    private Account _swapper = null!;

    [SetUp]
    public void Setup()
    {
        _feePayer = Util.ReadFromJson("feePayer.json");
        _mainSwapConfig = Util.ReadFromJson("mainSwapConfig.json");
        _swapAuthority = Util.ReadFromJson("swapAuthority.json");
        _royaltyWallet = Util.ReadFromJson("royaltyWallet.json");
        _adminAccount = Util.ReadFromJson("adminAccount.json");
        _swapper = Util.ReadFromJson("swapper.json");

        _programId = new("HWeQ1ntizxmbMwVHemf9zncf2h6RTTfLiuzbjD9wAN9e");
        _client = ClientFactory.GetClient(Cluster.TestNet);
    }
}