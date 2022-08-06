import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Beta} from "../components/landing/Beta/Beta";
import {Box} from "@chakra-ui/react";

function Home() {

    return (
        <Box overflow="hidden">
            {LandingStyles}
            <Beta/>
        </Box>
    );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
