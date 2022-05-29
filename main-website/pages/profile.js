import {useAddress, useChainId, useNFTDrop} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Profile} from "../components/landing/Profile/Profile";
import {Box} from "@chakra-ui/react";

function Home() {
  const [collection, setCollection] = useState([]);
  const nftDrop = useNFTDrop("0x81D2AD8ba7185b19247a7D7D72EA8f0152eafc65");
  const address = useAddress();
  const chainId = useChainId();

  useEffect(() => {
    if (!nftDrop || !address) return;
    nftDrop
      .getOwned(address)
      .then(async (tx) => {
        setCollection(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chainId, address]);

  return (
    <Box overflow="hidden">
      {LandingStyles}
      <Profile cards={collection}/>
    </Box>
  );
}

Home.needChakra = true;
Home.needThirdweb = true;
export default Home;
