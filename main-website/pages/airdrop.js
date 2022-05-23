import React from "react";
import {Airdrop} from "../components/landing/Airdrop/Airdrop";
import {LandingStyles} from "../styles/SectionsGlobalStyles";

function Home () {
    return <>
        {LandingStyles}
        <Airdrop/>
    </>
}

Home.needChakra = true;
Home.needThirdweb = true;

export default Home;
