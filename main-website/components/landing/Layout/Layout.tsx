import {Box} from "@chakra-ui/react";
import AllSpots from "./BackgroundSpots/AllSpots";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {useWindowSize} from "../../../hooks/useWindowSize";

const Layout = ({children}) => {
    const size = useWindowSize();
    return <Box paddingTop="64px" >
        <Header/>
        <AllSpots/>
        <Box minH={(size.height - 64) + "px"}>
            {children}
        </Box>

        <Footer/>
    </Box>
}

export default Layout;