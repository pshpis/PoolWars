import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Profile} from "../components/landing/Profile/Profile";

export default function Home () {
    return <>
        {LandingStyles}
        <Profile/>
    </>
}

Home.needChakra = true;
Home.needThirdweb = true;
