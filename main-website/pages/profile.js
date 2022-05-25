import {useAddress, useNetwork, useNFTDrop} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Profile} from "../components/landing/Profile/Profile";

function Home() {
  const [collection, setCollection] = useState([]);
  const nftDrop = useNFTDrop("0x81D2AD8ba7185b19247a7D7D72EA8f0152eafc65");
  const address = useAddress();
  const network = useNetwork();

  useEffect(() => {
    if (!nftDrop || !address) return;
    nftDrop
      .getOwned(address)
      .then(async (tx) => {
        console.log(tx);
        setCollection(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  }, network);

  return (
    <>
      {LandingStyles}
      <Profile cards={collection}/>
    </>
  );
}

Home.needChakra = true;
Home.needThirdweb = true;
export default Home;
