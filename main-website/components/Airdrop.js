import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { React, useState } from "react";
import airdrop from "../styles/airdrop.module.css";
import meta from "../styles/meta.module.css";
//database
const codes = ["Petr.off"];
async function updateCode(id) {
  await fetch(`/api/update/${id}`, {
    method: "PUT",
  });
}
async function checkCode(id) {
  const res = await fetch(`/api/check/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.value;
}

function Airdrop() {
  const [input, setInput] = useState("");
  const [check, setCheck] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const nftDrop = useNFTDrop("0xF643591DC6b5c3516a0B748500aCe87ea57558aF");
  const address = useAddress();
  const MintNft = () => {
    if (!nftDrop || !address) return;
    nftDrop
      .claimTo(address, 1)
      .then(async (tx) => {
        console.log(tx);
        updateCode(input);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFreeze(true);
    const serverAnswer = await checkCode(input);
    console.log(serverAnswer);
    if (!serverAnswer) {
      setFreeze(false);
    }
    await setCheck(serverAnswer);
  };
  const handleInputChange = (e) => {
    if (!freeze) {
      setInput(e.target.value);
    }
  };
  return (
    <div className={airdrop.wrapper}>
      <div className={airdrop.title}>Airdrop Title</div>
      <div className={airdrop.desc}>right code: Petr.off</div>

      <form onSubmit={handleSubmit} className={airdrop.form}>
        <input
          disabled={freeze}
          type="text"
          placeholder="Write your code..."
          className={airdrop.input}
          value={input}
          onChange={handleInputChange}
        />
        {check && <span>Checked!!</span>}
        {check ? (
          <button
            className={`${airdrop.mint_button} ${meta.button} ${meta.button_primary}  ${meta.button_medium} `}
            onClick={MintNft}
          >
            Mint
          </button>
        ) : (
          <input
            type="submit"
            value="Check"
            className={`${airdrop.mint_button} ${meta.button} ${meta.button_primary}  ${meta.button_medium} `}
          />
        )}
      </form>
    </div>
  );
}

export default Airdrop;