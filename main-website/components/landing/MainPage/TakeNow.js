import {Box, Center, ListItem, Text, useToast} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {ElderKattsBox} from "../Layout/ElderKattsBox";

export const TakeNow = () =>
{
    const size = useWindowSize();
    let sidePadding = "37px";
    if (size.width < 500) sidePadding="15px";
    const toast = useToast();
    let toastId = '';
    const takeNowOnClick = () => {
        if (!toast.isActive(toastId)){
            toast({
                id: toastId,
                title: 'Airdrop will be available soon',
                status: 'info',
                position: 'top',
                isClosable: 'true',
            });
        }
    }
    return <ElderKattsBox maxWidth={size.width > 1100 ? "520px" : "100%"}
             padding={"32px " + sidePadding + " 32px"}>

            <Box color="#71CFC3;" fontFamily="Njord" fontWeight="400" textAlign="center" fontSize="32px" mb="40px">
                CARD&#39;S FREE MINT WILL AVAILIBLE SOON
            </Box>

            <Center w="100%" mb="40px">
                <Box width="100%" backgroundColor="#B2B2B2" height="64px" borderRadius="24px" padding="6px">
                    <Box ml="5px" width="2.5%" backgroundColor="#E8E8E8" height="100%" borderLeftRadius="20px"/>
                </Box>
            </Center>

            <Box fontSize="20px" lineHeight="30px" mb="32px">
                {/*<Text fontWeight="600" mb="13px">To take your exclusive card you should:</Text>*/}
                {/*<UnorderedList pl="5px" mb="32px">*/}
                {/*    <ListItem fontWeight="300">subscribe to our&nbsp;*/}
                {/*        <a href="https://discord.gg/nhn8CEw48Z"><Box fontStyle="SemiBold" fontWeight="600" fontSize="20px" lineHeight="30px" as="span" color="#B8C3E6">discord</Box></a>*/}
                {/*    </ListItem>*/}
                {/*    <ListItem fontWeight="300">subscribe to our&nbsp;*/}
                {/*        <a href="https://twitter.com/TheElderKatts"><Box fontStyle="SemiBold" fontWeight="600" fontSize="20px" lineHeight="30px" as="span" color="#B8C3E6" >twitter</Box></a>*/}
                {/*    </ListItem>*/}
                {/*</UnorderedList>*/}
                <Center><Text fontWeight="600" fontSize="48px" mb="40px" color="#71CFC3;">TBA</Text></Center>
                <Text fontWeight="300" fontStyle="Light">
                    Connect your twitter and discord to your account to get card!
                </Text>
            </Box>

            <Box width="100%" height="48px" lineHeight="28px" borderRadius="24px"
                 fontFamily="Roboto Flex" fontWeight="600" textAlign="center" color="#202020"
                 backgroundColor="#B8C3E6" fontSize="24px" transition="0.3s ease"
                 _hover={{boxShadow: "7px 7px 14px 3px rgba(255, 255, 255, 0.19);"}}
                 onClick={takeNowOnClick}
            >
                <Text pt="10px" pb="14px">TAKE NOW</Text>
            </Box>


        </ElderKattsBox>;
}