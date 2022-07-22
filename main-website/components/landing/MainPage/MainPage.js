import {Box, Center, Flex, Stack} from "@chakra-ui/react";
import {Welcome} from "./Welcome";
import {TakeNow} from "./TakeNow";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";
import Layout from "../Layout/Layout";
import PreviewSwiper from "./PreviewSwiper";
import {Roadmap} from "./Roadmap";
import {Team} from "./Team";

export const MainPage = () => {
    const size = useWindowSize();
    let defaultSidePadding = "20px";
    if (size.width < 500) defaultSidePadding = "10px"
    return <Layout>
        <Box  pt={size.width > 1000? "80px" : "20px"} paddingRight={size.width > 1300 ? "6.6%" : defaultSidePadding}
              paddingLeft={size.width > 1300 ? "6.6%" : defaultSidePadding} w="100%">
            <Stack direction={size.width > 1100 ? "row" : "column"} maxW="1248px" w="100%" margin="0 auto" >
                <Welcome/>
                <Flex w="100%" flexDirection="row-reverse" justifyContent={size.width > 1100 ? "initial":"space-around"} alignItems="center">
                    <TakeNow />
                </Flex>
            </Stack>
        </Box>

        <PreviewSwiper margin="100px 0"/>
        <Roadmap margin="60px 0 80px"/>
        <Team marginBottom="160px"/>
    </Layout>
}