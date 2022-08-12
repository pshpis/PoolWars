import {
    Box, Center, Divider,
    Drawer, DrawerContent,
    DrawerOverlay,
    HStack, Icon, Spacer, useDisclosure, useToast,
    VStack
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {HamburgerIcon} from "@chakra-ui/icons";
import {AiOutlineClose} from "react-icons/ai";

import ConnectButton from "../ConnectButton";
import React from "react";

const FakeLink = ({children, href}) => {
    const toast = useToast();
    let toastId = '';
    const onClick = () => {
        if (!toast.isActive(toastId)){
            toast({
                id: toastId,
                title: `This page will be available after mint opening`,
                status: 'info',
                position: 'top',
                isClosable: true,
            });
        }
    }
    return <Box cursor="pointer" as="span" onClick={onClick}
                color={window.location.host+href === window.location.href.split("//")[1] ? "#B8C3E6" : "inherit"}
                fontSize={window.location.host+href === window.location.href.split("//")[1] ? "1.2em" : "inherit"}>{children}</Box>;
}

const RealLink = ({children, href}) => {
    const onClick = () => window.location.replace(href);
    return <Box cursor="pointer" as="span" onClick={onClick}
                color={window.location.host+href === window.location.href.split("//")[1] ? "#B8C3E6" : "inherit"}
                fontSize={window.location.host+href === window.location.href.split("//")[1] ? "1.2em" : "inherit"}>{children}</Box>;
}

const HeaderNavSpacer = () => {
    return <Box width="3vw"/>
}

const HeaderNavSpacerMobile = () => {
    return <Box height="4vh"/>
}

const HeaderNavEl = ({children}) => {
    return <Box _hover={{color: "#B8C3E6"}} transition="0.3s ease" ml={0} lineHeight="1.2em">{children}</Box>
}

const HeaderNavElMobile = ({children}) => {
    return <Box _hover={{color: "#B8C3E6"}} transition="0.3s ease" ml={0} w="100%" pl="20px" lineHeight="1.2em">{children}</Box>
}

const HeaderNav = () => {
    return <HStack fontStyle="light" color="#B2B2B2" fontFamily="Roboto Flex" fontWeight="300" spacing={0}>
        <HeaderNavEl><RealLink href="/profile">profile</RealLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><RealLink href="/mint">mint</RealLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><RealLink href="/swaps">swaps</RealLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><FakeLink href="/pool-wars">events</FakeLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><RealLink href="/whitepaper/">whitepaper</RealLink></HeaderNavEl>
    </HStack>
}

const HeaderNavMobile = ({onClose}) => {
    return <VStack fontStyle="light" color="#B2B2B2" fontFamily="Roboto Flex" fontWeight="300" spacing={0} fontSize="24px" height="100%" pb="20px">
        <HeaderNavElMobile><RealLink href="/profile" style={{textDecoration: 'none'}}>profile</RealLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><RealLink href="/mint">mint</RealLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><RealLink href="/swaps">swaps</RealLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><FakeLink href="/pool-wars">events</FakeLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><RealLink href="/whitepaper/" style={{textDecoration: 'none'}}>whitepaper</RealLink></HeaderNavElMobile>
        <Spacer/>
        <ConnectButton onClick={onClose}/>
    </VStack>
}

export const Header = () => {
    const size = useWindowSize();
    const {isOpen, onOpen, onClose} = useDisclosure();

    let sidePadding = "6.6%";
    if (size.width < 1100) sidePadding = "15px";

    return <>
        {
            size.width < 768 ?
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />

                <DrawerContent backgroundColor="#202020" pt="64px" position="relative">
                    <Box position="absolute" top="20px" right="5px" color="white" zIndex={3} onClick={onClose}>
                        <Icon as={AiOutlineClose} color="white" width="25px" height="25px"/>
                    </Box>
                    <Box pt="10px" pb="14px" height="64px" lineHeight="64px" position="fixed" left="0" top="0"
                         zIndex={2} backgroundColor="#202020" width="100%" pl="20px">
                        <Logo/>
                    </Box>
                    <Divider mb="40px" borderColor="#E8E8E826" border="0.5px" width="99.5%" boxShadow="0px 4px 4px rgba(232, 232, 232, 0.15)"/>
                    <HeaderNavMobile onClose={onClose}/>
                </DrawerContent>
            </Drawer> : ""
        }
        <Box position="fixed" top="0" left="0"
             backgroundColor="#202020" boxShadow="0px 4px 4px rgba(232, 232, 232, 0.15)"
             padding={"0 " + sidePadding} w="100%" height="64px"  zIndex={999}>
            <HStack direction="row" spacing={0} height="64px" w="100%" maxW="1248px" margin="0 auto">
                {
                    size.width >= 768?
                        <><Logo/> <HeaderNav/> <Spacer/>
                            <ConnectButton/></> :
                        <><Center width="46px" height="100%" padding="0 10px" mr="20px" onClick={onOpen}>
                            <HamburgerIcon height="40px" width="40px"/>
                        </Center> <Logo/></>
                }

            </HStack>
        </Box>

        </>
};