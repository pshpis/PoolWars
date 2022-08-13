import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Box} from "@chakra-ui/react";
import {SubmitWallet} from "../components/landing/SubmitWallet/SubmitWallet";

function Home() {

    return (
        <Box overflow="hidden">
            {LandingStyles}
            <SubmitWallet/>
        </Box>
    );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
