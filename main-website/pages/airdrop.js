import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Airdrop} from "../components/landing/Airdrop/Airdrop";

export default function Home () {
    return <>
        {LandingStyles}
        <Airdrop/>
    </>
}

Home.needChakra = true;
Home.needThirdweb = true;