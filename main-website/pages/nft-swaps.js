import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {NftSwaps} from "../components/landing/NftSwaps/NftSwaps";

export default function Home () {
    return <>
        {LandingStyles}
        <NftSwaps/>
    </>
}

Home.needChakra = true;
Home.needWeb3 = true;