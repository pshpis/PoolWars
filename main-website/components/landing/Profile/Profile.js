import {Header} from "../Layout/Header/Header";
import {
    Box,
    Center,
    SimpleGrid, Stack,
    Text
} from "@chakra-ui/react";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {PoolWarsDivider} from "../Layout/PoolWarsDivider";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React from "react";
import {ProfileCard} from "./ProfileCard";

export const Profile = ({cards}) => {
    const size = useWindowSize();
    return <Box paddingTop="77px" overflow="hidden">
        <FirstSpot/>
        <Header/>
        <Box padding="0 5.5%" w="100%" mt="52px" mb="86px">
            <Text fontWeight="900" fontFamily="Trap" fontSize={size.width >= 768? "86px" : "46px"} mb="43px">
                Your profile
            </Text>
            <Stack w="100%" spacing="20px" fontFamily="Trap" fontWeight="800"
                   direction={size.width >= 768 ? "row": "column"}>
                <Box backgroundColor="rgba(232, 227, 221, 0.09)" backdropFilter="blur(29.788px)" borderRadius="60px"
                     boxShadow="inset 4.51333px -4.51333px 4.51333px rgba(195, 191, 186, 0.464), inset -4.51333px 4.51333px 4.51333px rgba(255, 255, 255, 0.464)"
                     height="357px" w='100%'>
                    <Text mt="53px" ml="46px" fontSize="36px" mb="58px">
                        Warlords
                    </Text>
                    <Text fontSize="180px" width="100%" pr="55px" textAlign="right" lineHeight="180px" color="#7951F5">
                        0
                    </Text>

                </Box>
                <Box backgroundColor="rgba(232, 227, 221, 0.09)" backdropFilter="blur(29.788px)" borderRadius="60px"
                     boxShadow="inset 4.51333px -4.51333px 4.51333px rgba(195, 191, 186, 0.464), inset -4.51333px 4.51333px 4.51333px rgba(255, 255, 255, 0.464)"
                     height="357px" w='100%'>
                    <Text mt="53px" ml="46px" fontSize="36px" mb="58px">
                        Increase cards
                    </Text>
                    <Text fontSize="180px" width="100%" pr="55px" textAlign="right" lineHeight="180px" color="#7951F5">
                        {cards.length}
                    </Text>
                </Box>
            </Stack>
        </Box>
        <PoolWarsDivider/>
        <SimpleGrid mt="50px" pb="50px" minChildWidth='320px' spacing="50px 10px" pl="10px" pr="10px">
            {cards.map((card) => (
                <Center h="450px" key={card.metadata.id._hex}>
                    <ProfileCard data={card} />
                </Center>
            ))}
            {/*<Center h="450px">*/}
            {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
            {/*</Center>*/}

            {/*<Center h="450px">*/}
            {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
            {/*</Center>*/}
            {/*<Center h="450px">*/}
            {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
            {/*</Center>*/}
            {/*<Center h="450px">*/}
            {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
            {/*</Center>*/}
            {/*<Center h="450px">*/}
            {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
            {/*</Center>*/}
        </SimpleGrid>
    </Box>
}