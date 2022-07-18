import {Box, BoxProps, Center, HStack, Icon, Stack, Text} from "@chakra-ui/react";
import {FaDiscord, FaTelegram, FaTwitter} from "react-icons/fa";
import Link from "next/link";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {Logo} from "../Header/Logo";

export const Footer = (props: BoxProps) => {
    const size = useWindowSize();

    return <Stack fontFamily="Roboto Flex" direction={size.width >= 768? "row": "column"} backgroundColor="#202020" width="100%"
                  pl={size.width > 800 ? "96px" : "30px"} pt="44px" pb="96px"
                  boxShadow="0px -17px 24px 0px rgba(211,205,198,0.2)" spacing={size.width >= 768? "30%": "30px"}
                  {...props}>
        <Box>
            <Box mb="48px">
                <Logo height="67px" width="205px"/>
            </Box>

            <Box lineHeight="19px" color="#B8C3E6">
                <Text>pool.official@gmail.com</Text>
                <br/>
                <Link href="/whitepaper"><Text>White paper</Text></Link>
                <br/>
                <Link href="/"><Text>Home Page</Text></Link>
                <br/>
                <Text mt="16px" color="#E8E8E8">pool-wars-git-main-website-pshpis.vercel.app &copy;</Text>
            </Box>
        </Box>
        <Box>
            <HStack lineHeight="19px" spacing={size.width > 1000 ? "115px" : "40px"} color="#E8E8E8">
                <a href="https://discord.gg/rzd8ckvmpj">
                    <HStack as={Center} spacing="16px">
                        <Icon w="28px" h="27px" as={FaDiscord}/><Text>Discord</Text>
                    </HStack>
                </a>
                <a href="https://twitter.com/PoolWars_NFT">
                    <HStack as={Center} spacing="16px">
                        <Icon w="31px" h="30px" as={FaTwitter}/><Text>Twitter</Text>
                    </HStack>
                </a>
            </HStack>

            <Box mt="80px">
                <Text color="#B2B2B2" lineHeight="24px" mb="80px">
                    We are creating a unique NFT portrait collection of the most powerful and strongest nordic warriors in history.
                </Text>
                <Text>2022 Elder Katts all rights reserved</Text>
            </Box>

        </Box>
    </Stack>
}