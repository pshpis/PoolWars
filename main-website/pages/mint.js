import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Mint} from "../components/landing/Mint/Mint";
import {Box} from "@chakra-ui/react";

function Home() {

    return (
        <Box overflow="hidden">
            {LandingStyles}
            <Mint/>
        </Box>
    );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
