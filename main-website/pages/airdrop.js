import React from "react";
import {Airdrop} from "../components/landing/Airdrop/Airdrop";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Box} from "@chakra-ui/react";

function Home () {
    return <Box overflow="hidden">
        {LandingStyles}
        <Airdrop/>
    </Box>
}

Home.needChakra = true;
Home.needWeb3 = true;

export default Home;
