import {Box, Center, HStack, Img, Spacer, Stack} from "@chakra-ui/react";
import {Welcome} from "./Welcome";
import {TakeNow} from "./TakeNow";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";
import Layout from "../Layout/Layout";
import PreviewSwiper from "./PreviewSwiper";
import {Roadmap} from "./Roadmap";

export const MainPage = () => {
    const size = useWindowSize();
    let defaultSidePadding = "20px";
    if (size.width < 500) defaultSidePadding = "10px"
    return <Layout>
        <Stack pt={size.width > 1000? "80px" : "20px"} paddingLeft={size.width > 1300 ? "5.5%" : defaultSidePadding}
               direction={size.width > 1100 ? "row" : "column"} paddingRight={size.width > 1300 ? "5.5%" : defaultSidePadding}>
            <Welcome/>
            <Center w="100%"><TakeNow /></Center>
        </Stack>
        <PreviewSwiper margin="100px 0"/>
        <Roadmap margin="60px 0 160px"/>
    </Layout>
}