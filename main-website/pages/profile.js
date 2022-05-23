import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Profile} from "../components/landing/Profile/Profile";

function Home() {
  const [collection, setCollection] = useState([]);
  const nftDrop = useNFTDrop("0x60D8e84b75A0965CBB6DA91bAB98800fC8B57969");
  const address = useAddress();
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
  }, []);

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
