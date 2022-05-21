import {Box, Center, Flex, HStack, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import {Header} from "./Header";
import {Welcome} from "./Welcome";
import {TakeNow} from "./TakeNow";

export const MainPage = () => {
    return <Box paddingTop="77px">
        <Box position="absolute" width="1040px" height="975px" right="-200px" top="250px"
             backgroundColor="rgba(51, 60, 237, 0.48);" filter="blur(482px)"/>
        <Header/>
        <HStack mt="70px" paddingLeft="5.5%">
            <Welcome/>
            <TakeNow/>
        </HStack>
        <Flex w="100%" mt="100px" maxW="100%" overflowY="hidden" overflowX="auto"
              flexWrap="nowrap" justifyContent="spaceBetween" whiteSpace="nowrap" mb="100px" paddingLeft="14px">
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
            <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);" mr="28px" flex="0 0 365px"/>
        </Flex>

    </Box>
}