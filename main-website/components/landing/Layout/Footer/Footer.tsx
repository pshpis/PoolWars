import {Box, BoxProps, Center, HStack, Icon, Stack, Text} from "@chakra-ui/react";
import {FaDiscord, FaTelegram, FaTwitter} from "react-icons/fa";
import Link from "next/link";
import {useWindowSize} from "../../../../hooks/useWindowSize";

export const Footer = (props: BoxProps) => {
    const size = useWindowSize();

    return <Stack direction={size.width >= 768? "row": "column"} as={Center} backgroundColor="#010201" width="100%" padding="50px 10px"
                boxShadow="0px -17px 24px 0px rgba(211,205,198,0.2)" spacing={size.width >= 768? "20%": "30px"}
                {...props}
    >
        <Box>
            <Box mb="20px">
                <Text fontSize="48px" lineHeight="60px" fontFamily="Trap" fontWeight="bold" textAlign="center">
                    Pool <Box as="span" color="#C4F57C">Wars</Box>
                </Text>
                <Text fontSize="24px" lineHeight="40px" fontFamily="onest" textAlign="center"
                      fontWeight={300}>Warlords NFT</Text>
            </Box>

            <Text color="#7951F5" textAlign="center">
                &copy;2022 Pool Wars <br/> All rights reserved
            </Text>
        </Box>
        <Box>
            <HStack as={Center} spacing="20px">
                <a href="https://discord.gg/rzd8ckvmpj"><Icon w="40px" h="40px" as={FaDiscord}/></a>
                <a href="https://t.me/PoolWarsAnnouncements"><Icon w="40px" h="40px" as={FaTelegram}/></a>
                <a href="https://twitter.com/PoolWars_NFT"><Icon w="40px" h="40px" as={FaTwitter}/></a>
            </HStack>
            <Center mt="40px">
                <Box>
                    <Text><Link href="/">Home Page</Link></Text>
                    <Text><Link href="/whitepaper">Whitepaper</Link></Text>
                </Box>
            </Center>
        </Box>
    </Stack>
}