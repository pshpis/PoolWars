import {MainPage} from "../components/landing/MainPage";
import {LandingStyles} from "../styles/SectionsGlobalStyles";

export default function Home () {
    return <>
        {LandingStyles}
        <MainPage/>
    </>
}

Home.needChakra = true;
Home.needThirdweb = true;