import {
    Box, Button, Center, Divider,
    Drawer, DrawerContent,
    DrawerOverlay,
    HStack, Icon, Link,
    Spacer, useDisclosure, useToast,
    VStack
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {HamburgerIcon} from "@chakra-ui/icons";
import {AiOutlineClose} from "react-icons/ai";

import ConnectButton from "../ConnectButton";
import React from "react";
import {useCookies} from "../../../../hooks/useCookies";

const FakeLink = ({children, href}) => {
    const {verify} = useCookies();
    const toast = useToast();
    let toastId = '';
    const onClick = () => {
        if (verify)
            window.location.replace(href);
        else
            if (!toast.isActive(toastId)){
                toast({
                    id: toastId,
                    title: `This page in beta test now`,
                    description: (
                        <div>
                            You can get access <Link cursor="pointer" href="/beta"><b><i><u>here</u></i></b></Link>
                        </div>
                    ),
                    status: 'info',
                    position: 'top',
                    isClosable: true,
                });
            }
    }
    return <Box cursor="pointer" as="span" onClick={onClick}>{children}</Box>;
}

const HeaderNavSpacer = () => {
    return <Box width="3vw"/>
}

const HeaderNavSpacerMobile = () => {
    return <Box height="4vh"/>
}

const HeaderNavEl = ({children}) => {
    return <Box _hover={{color: "#B8C3E6"}} transition="0.3s ease" ml={0}>{children}</Box>
}

const HeaderNavElMobile = ({children}) => {
    return <Box _hover={{color: "#B8C3E6"}} transition="0.3s ease" ml={0} w="100%" pl="20px">{children}</Box>
}

const HeaderNav = () => {
    return <HStack fontStyle="light" color="#B2B2B2" fontFamily="Roboto Flex" fontWeight="300" spacing={0}>
        <HeaderNavEl><Link href="/profile">profile</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><FakeLink href="/mint">mint</FakeLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><FakeLink href="/swaps">swaps</FakeLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><FakeLink href="/pool-wars">events</FakeLink></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/beta">beta</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/whitepaper/">whitepaper</Link></HeaderNavEl>
    </HStack>
}

const HeaderNavMobile = ({onClose}) => {
    return <VStack fontStyle="light" color="#B2B2B2" fontFamily="Roboto Flex" fontWeight="300" spacing={0} fontSize="24px" height="100%" pb="20px">
        <HeaderNavElMobile><Link href="/profile">profile</Link></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><FakeLink href="/mint">mint</FakeLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><FakeLink href="/swaps">swaps</FakeLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><FakeLink href="/pool-wars">events</FakeLink></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><Link href="/beta">beta</Link></HeaderNavElMobile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElMobile><Link href="/whitepaper/">whitepaper</Link></HeaderNavElMobile>
        <Spacer/>
        <ConnectButton onClick={onClose}/>
    </VStack>
}

export const Header = () => {
    const size = useWindowSize();
    const {isOpen, onOpen, onClose} = useDisclosure();

    let sidePadding = "6.6%";
    if (size.width < 1100) sidePadding = "20px";



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