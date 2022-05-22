import {Header} from "../Layout/Header/Header";
import {
    Box,
    Button, Center,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {PicPreview} from "../MainPage/PicPreview";
import {PoolWarsDivide} from "../Layout/PoolWarsDivide";

export const Profile = () => {
    return <Box paddingTop="77px">
        <FirstSpot/>
        <Header/>
        <Box padding="0 80px" w="100%" mt="52px" mb="86px">
            <Text fontWeight="900" fontFamily="Trap" fontSize="86px" mb="43px">
                Your profile
            </Text>
            <HStack w="100%" spacing="20px" fontFamily="Trap" fontWeight="800">
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
                        1
                    </Text>
                </Box>
            </HStack>
        </Box>
        <PoolWarsDivide/>
        <SimpleGrid mt="50px" pb="50px" minChildWidth='365px' spacing="50px 10px">
            <Center h="450px">
                <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>
            </Center>

            <Center h="450px">
                <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>
            </Center>
            <Center h="450px">
                <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>
            </Center>
            <Center h="450px">
                <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>
            </Center>
            <Center h="450px">
                <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>
            </Center>
        </SimpleGrid>
    </Box>
}