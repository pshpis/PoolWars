import {Box, Center, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import Link from "next/link";
import {PoolWarsBox} from "../Layout/PoolWarsBox";

export const TakeNow = () =>
{
    const size = useWindowSize();
    let sidePadding = "37px";
    if (size.width < 500) sidePadding="15px";
    return <Center w="100%">
        <PoolWarsBox maxWidth={size.width > 1100 ? "520px" : "100%"} borderRadius={size.width >= 500? 60: 40}
             padding={"44px " + sidePadding + " 34px"}>

            <Box fontFamily="Trap" fontWeight="800" textAlign="center" fontSize="36px" mb="25px">
                Card&#39;s Airdrop now Live
            </Box>

            <Center w="100%" mb="30px">
                <Box width="100%" backgroundColor="#C4C4C4" height="46px" borderRadius="23px" padding="3px">
                    <Box width="40%" backgroundColor="#C4F57C" height="100%" boxShadow="0px 0px 4px #097676"
                         borderRadius="20px 3px 3px 20px"/>
                </Box>
            </Center>

            <Box fontSize="20px" fontFamily="Onest">
                <Text fontWeight="700" mb="13px">To take your exclusive card you should:</Text>
                <UnorderedList fontWeight="300" pl="5px" mb="26px">
                    <ListItem>subscribe to our&nbsp;
                        <a href="https://t.me/PoolWarsAnnouncements"><Box as="span" color="#7951F5">telegram</Box></a>
                    </ListItem>
                    <ListItem>subscribe to our&nbsp;
                        <a href="https://twitter.com/PoolWars_NFT"><Box as="span" color="#7951F5" >twitter</Box></a>
                    </ListItem>
                </UnorderedList>
                <Text fontWeight="300" >
                    Write our bot to take your personal code which lets you take your NFT
                </Text>
            </Box>


            <Link href="/airdrop-auth">
                <Box width="100%" height="65px" lineHeight="70px" borderRadius="33px"
                     fontFamily="Trap" fontWeight="800" textAlign="center" color="#333CED"
                     backgroundColor="#B8C3E6" fontSize="34px" mt="48px" transition="0.3s ease"
                     _hover={{boxShadow: "7px 7px 14px 3px rgba(255, 255, 255, 0.19);"}}
                >
                    TAKE NOW
                </Box>
            </Link>


        </PoolWarsBox>
    </Center>;
}