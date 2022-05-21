import {Box, Center, Flex, HStack, ListItem, Stack, Text, UnorderedList} from "@chakra-ui/react";
import {Header} from "./Header";
import {Welcome} from "./Welcome";
import {TakeNow} from "./TakeNow";
import {useWindowSize} from "../../hooks/useWindowSize";
import {PicPreview} from "./PicPreview";

export const MainPage = () => {
    const size = useWindowSize();
    let defaultSidePadding = "20px";
    if (size.width < 500) defaultSidePadding = "10px"
    return <Box paddingTop="77px">
        <Box position="absolute" width="1040px" height="975px" right="-200px" top="250px"
             backgroundColor="rgba(51, 60, 237, 0.48);" filter="blur(482px)"/>
        <Header/>
        <Stack mt={size.width > 500? "70px" : "20px"} paddingLeft={size.width > 1100 ? "5.5%" : defaultSidePadding}
               direction={size.width > 1100 ? "row" : "column"} paddingRight={defaultSidePadding}>
            <Welcome/>
            <TakeNow/>
        </Stack>
        <PicPreview/>
    </Box>
}