import React from "react";
import {AirdropAuth} from "../components/landing/Airdrop/AirdropAuth";
import {LandingStyles} from "../styles/SectionsGlobalStyles";

function Home(){
    return <>
        {LandingStyles}
        <AirdropAuth/>
    </>
}

Home.needChakra = true;
Home.needThirdweb = true;

export default Home;