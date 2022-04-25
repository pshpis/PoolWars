import {Button, Image, Heading, Text, Table, Box, Flex, Center, VStack, HStack} from "@chakra-ui/react";
import {useState} from "react";
import {FaTwitter} from "react-icons/all";

export const Links = () => {
    const [isFirstHover, setFirstHover] = useState(false);
    const [isSecondHover, setSecondHover] = useState(false);

    return <>
        <Heading fontSize="48px" lineHeight="54px">Links</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Links that are related to the “Pool Wars“</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontSize="32px" fontWeight="700" lineHeight="40px">Telegram</Text>
        <Box padding="16px 0px">
            <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
                 border={isSecondHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"}borderRadius="4px" padding="16px">
                <Center height="100%">
                    <Flex width="100%" justifyContent="space-after">
                        <VStack height="48px" spacing="0">
                            <Image padding="8px 8px 0px 0px" alt draggable="false" src='https://telegram.org/favicon.ico?3'/>
                        </VStack>
                        <VStack height="48px" spacing="0">
                            <Text fontWeight="500" lineHeight="24px" fontSize="16px">Pool Wars</Text>
                            <Text fontWeight="500" lineHeight="24px" fontSize="16px">Telegram</Text>
                        </VStack>
                    </Flex>
                </Center>
            </Box>
        </Box>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontSize="32px" fontWeight="700" lineHeight="40px">Twitter</Text>
        <Box padding="16px 0px">
            <Box flex="1 1 0px" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
                 border={isSecondHover ? "1px solid rgb(52, 109, 219)" : "1px solid rgba(227,232,237,1.00)"}borderRadius="4px" padding="16px">
                <Center height="100%">
                    <Flex width="100%" justifyContent="space-after">
                        <VStack height="48px" spacing="0">
                            <Button padding="8px 8px 0px 0px" alt draggable="false" colorScheme='twitter' leftIcon={<FaTwitter/>}/>
                        </VStack>
                        <VStack height="48px" spacing="0">
                            <Text fontWeight="500" lineHeight="24px" fontSize="16px">Pool Wars</Text>
                            <Text fontWeight="500" lineHeight="24px" fontSize="16px">Telegram</Text>
                        </VStack>
                    </Flex>
                </Center>
            </Box>
        </Box>
    </>;
}