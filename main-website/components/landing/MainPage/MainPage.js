import {Box, Center, Flex, HStack, ListItem, Stack, Text, UnorderedList} from "@chakra-ui/react";
import {Header} from "../Layout/Header/Header";
import {Welcome} from "./Welcome";
import {TakeNow} from "./TakeNow";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {PicPreview} from "./PicPreview";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {Roadmap} from "./Roadmap";

export const MainPage = () => {
    const size = useWindowSize();
    let defaultSidePadding = "20px";
    if (size.width < 500) defaultSidePadding = "10px"
    return <Box paddingTop="77px">
        <FirstSpot/>
        <Header/>
        <Stack mt={size.width > 500? "70px" : "20px"} paddingLeft={size.width > 1100 ? "5.5%" : defaultSidePadding}
               direction={size.width > 1100 ? "row" : "column"} paddingRight={defaultSidePadding}>
            <Welcome/>
            <TakeNow/>
        </Stack>
        <PicPreview/>
        <Roadmap/>
    </Box>
}