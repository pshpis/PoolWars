import {Box, Center, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import Link from 'next/link'

export const TakeNow = () =>
{
    return <Center w="100%">
        <Box width={520} borderRadius={60} background="rgba(232, 227, 221, 0.09);"
             boxShadow="inset 4.51333px -4.51333px 4.51333px rgba(195, 191, 186, 0.464), inset -4.51333px 4.51333px 4.51333px rgba(255, 255, 255, 0.464);"
             backdropFilter="blur(29.788px)" padding="44px 37px 34px">

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
                    <ListItem>subscribe to our telegram</ListItem>
                    <ListItem>subscribe to our twitter</ListItem>
                </UnorderedList>
                <Text fontWeight="300" >
                    Write our bot to take your personal code which lets you take your NFT
                </Text>
            </Box>


            <a target="_blank" href="https://t.me/WarlordCardsAirdropBot">
                <Box width="100%" height="65px" lineHeight="70px" borderRadius="33px"
                     fontFamily="Trap" fontWeight="800" textAlign="center" color="#333CED"
                     backgroundColor="#B8C3E6" fontSize="34px" mt="48px" transition="0.3s ease"
                     _hover={{boxShadow: "7px 7px 14px 3px rgba(255, 255, 255, 0.19);"}}
                >
                    TAKE NOW
                </Box>
            </a>


        </Box>
    </Center>;
}