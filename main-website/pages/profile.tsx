import PageContainer from "../components/PageContainer";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import profile from "../styles/profile.module.css";
import global from "../styles/global.module.css";
import CardGrid from "../components/CardGrid";

function Profile() {
  const [collection, setCollection] = useState([]);
  const nftDrop = useNFTDrop("0xF643591DC6b5c3516a0B748500aCe87ea57558aF");
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
    <PageContainer>
      <section className={profile.profile}>
        <div className={`${profile.container} ${global.container}`}>
          {collection.length !== 0 && <CardGrid cards={collection} />}
        </div>
      </section>
    </PageContainer>
  );
}

export default Profile;
