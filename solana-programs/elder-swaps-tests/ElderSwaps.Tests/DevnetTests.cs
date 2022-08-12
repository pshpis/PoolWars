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
        _feePayer = new("ZyomNTsWGc1Z2gkagc8f6cFLzi41U8VGf4qzyfnAmyUY5ABe6BbCP6UrMydX5VTHsNpBgSXvqgWhz5DvJiXLozT",
            "4yPHTi9whraHaRvQNH2e1AJezDJvPUTjehyrjKHzPLj5");

        _mainSwapConfig = Util.ReadFromJson("mainSwapConfig.json");
        _swapAuthority = Util.ReadFromJson("swapAuthority.json");

        _royaltyWallet = new("ZyomNTsWGc1Z2gkagc8f6cFLzi41U8VGf4qzyfnAmyUY5ABe6BbCP6UrMydX5VTHsNpBgSXvqgWhz5DvJiXLozT",
            "4yPHTi9whraHaRvQNH2e1AJezDJvPUTjehyrjKHzPLj5");

        _adminAccount = new("ZyomNTsWGc1Z2gkagc8f6cFLzi41U8VGf4qzyfnAmyUY5ABe6BbCP6UrMydX5VTHsNpBgSXvqgWhz5DvJiXLozT",
            "4yPHTi9whraHaRvQNH2e1AJezDJvPUTjehyrjKHzPLj5");

        _swapper = Util.ReadFromJson("swapper.json");

        _programId = new("HWeQ1ntizxmbMwVHemf9zncf2h6RTTfLiuzbjD9wAN9e");
        _client = ClientFactory.GetClient(Cluster.MainNet);
    }
}