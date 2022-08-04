import {Box, Center, Flex, Img, ListItem, Text, UnorderedList, useToast} from "@chakra-ui/react";
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
    return <ElderKattsBox position="relative" maxWidth={size.width > 1100 ? "520px" : "100%"}
             pt="32px" pl="40px" pr="40px">
        <Img zIndex={0} src="/shadowKatt.svg"/>
        <Center>
            <Text zIndex={1} top="40%" position="absolute" fontWeight="400" fontFamily="Njord"
                  fontSize={size.width < 400 ? "64px" : "88px"} lineHeight="83px"
                  color="#71CFC3" textShadow="0px 0px 113px #71CFC3;">
                SOON
            </Text>
        </Center>


    </ElderKattsBox>;
}