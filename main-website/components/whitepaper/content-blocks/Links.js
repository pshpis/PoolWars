import {Button, Image, Heading, Text, Table, Box, Flex, Center, VStack, HStack, Icon, Link} from "@chakra-ui/react";
import {useState} from "react";
import {FaTwitterSquare} from "react-icons/fa";
import {BsTelegram, BsDiscord} from "react-icons/bs";

const TwitterButton = () => {
    const [isHover, setHover] = useState(false);
    return <a href="https://twitter.com/PoolWars_NFT">
    <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
                border={isHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"}
                borderRadius="4px" padding="16px" margin="16px 0" onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
        <Center height="100%">
            <Flex width="100%" justifyContent="space-after">
                <Center height="48px" spacing="0" marginRight="16px">
                    <Icon color="#188CD8" as={FaTwitterSquare} w="32px" h="32px"/>
                </Center>
                <VStack height="48px" spacing="0">
                    <Text fontWeight="500" lineHeight="24px" fontSize="16px" w="100%" color={isHover ? "rgb(52, 109, 219)" : "inherit"}>Pool Wars</Text>
                    <Text fontWeight="500" lineHeight="24px" fontSize="16px" w="100%" color="rgba(136,153,168,1.00)">Twitter</Text>
                </VStack>
            </Flex>
        </Center>
    </Box></a>;
};

const TelegramButton = () => {
    const [isHover, setHover] = useState(false);
    return <a href="https://t.me/PoolWarsAnnouncements">
    <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
                border={isHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"}
                borderRadius="4px" padding="16px" margin="16px 0px" onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
        <Center height="100%">
            <Flex width="100%" justifyContent="space-after">
                <Center marginRight="16px">
                    <Icon color="#24A1DE" as={BsTelegram} w="32px" h="32px"/>
                </Center>
                <VStack height="48px" spacing="0" textAlign="left">
                    <Text fontWeight="500" lineHeight="24px" fontSize="16px" w="100%" color={isHover ? "rgb(52, 109, 219)" : "inherit"}>Pool Wars Announcements</Text>
                    <Text fontWeight="500" lineHeight="24px" fontSize="16px" w="100%" color="rgba(136,153,168,1.00)">Telegram</Text>
                </VStack>
            </Flex>
        </Center>
    </Box></a>;
};

const DiscordButton = () => {
    const [isHover, setHover] = useState(false);
    return <a href="https://t.me/PoolWarsAnnouncements">
        <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
             border={isHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"}
             borderRadius="4px" padding="16px" margin="16px 0px" onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}>
            <Center height="100%">
                <Flex width="100%" justifyContent="space-after">
                    <Center marginRight="16px">
                        <Icon color="#5764F2" as={BsDiscord} w="32px" h="32px"/>
                    </Center>
                    <VStack height="48px" spacing="0" textAlign="left">
                        <Text fontWeight="500" lineHeight="24px" fontSize="16px" w="100%" color={isHover ? "rgb(52, 109, 219)" : "inherit"}>Pool Wars</Text>
                        <Text fontWeight="500" lineHeight="24px" fontSize="16px" w="100%" color="rgba(136,153,168,1.00)">Discord</Text>
                    </VStack>
                </Flex>
            </Center>
        </Box></a>;
}

export const Links = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Links</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Links that are related to the “Pool Wars“</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontSize="32px" fontWeight="700" lineHeight="40px">Twitter</Text>
        <TwitterButton />

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontSize="32px" fontWeight="700" lineHeight="40px">Telegram</Text>

        <TelegramButton />
        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>

        <Text padding="24px 0px 8px" fontSize="32px" fontWeight="700" lineHeight="40px">Discord</Text>

        <DiscordButton />
    </>;
}