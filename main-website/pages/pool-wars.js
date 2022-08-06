import { useState} from "react";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {PoolWars} from "../components/landing/PoolWars/PoolWars";
import {Box} from "@chakra-ui/react";

function Home() {

    return (
        <Box overflow="hidden">
            {LandingStyles}
            <PoolWars/>
        </Box>
    );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
