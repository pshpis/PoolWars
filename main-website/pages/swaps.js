import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Swaps} from "../components/landing/Swaps/Swaps";
import {Box} from "@chakra-ui/react";

function Home() {

    return (
        <Box overflow="hidden">
            {LandingStyles}
            <Swaps/>
        </Box>
    );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
