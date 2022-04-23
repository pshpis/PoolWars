import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import React from "react";
import PageContainer from "../components/PageContainer";

function Airdrop() {
  const nftDrop = useNFTDrop("0xF643591DC6b5c3516a0B748500aCe87ea57558aF");
  const address = useAddress();
  const MintNft = () => {
    if (!nftDrop || !address) return;
    nftDrop
      .claimTo(address, 1)
      .then(async (tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <PageContainer>
      <div>Airdrop</div>
      <button onClick={MintNft}>mint</button>
    </PageContainer>
  );
}

export default Airdrop;
