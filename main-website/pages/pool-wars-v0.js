import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {NftSwaps} from "../components/landing/NftSwaps/NftSwaps";
import {EventsV0} from "../components/landing/PoolWarsEvents/EventsV0";

export default function Home () {
    return <>
        {LandingStyles}
        <EventsV0/>
    </>
}

Home.needChakra = true;
Home.needWeb3 = true;