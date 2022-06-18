import {
    Box, Center,
    Drawer, DrawerContent,
    DrawerOverlay,
    HStack, Icon,
    Spacer,
    VStack
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {HamburgerIcon} from "@chakra-ui/icons";
import Link from "next/link";
import {AiOutlineClose} from "react-icons/ai";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";


const HeaderNavSpacer = () => {
    return <Box width="4.86vw"/>
}

const HeaderNavSpacerMobile = () => {
    return <Box height="4.86vh"/>
}

const HeaderNavEl = ({children}) => {
    return <Box _hover={{color:"#333CED"}} transition="0.3s ease" ml={0}>{children}</Box>
}

const HeaderNavElModile = ({children}) => {
    return <Box _hover={{color:"#333CED"}} transition="0.3s ease" ml={0} w="100%" pl="20px">{children}</Box>
}

const HeaderNav = () => {
    return <HStack fontFamily="Onest" fontWeight="300" spacing={0}>
        <HeaderNavEl><Link href="/airdrop">airdrop</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/profile">profile</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/whitepaper/">whitepaper</Link></HeaderNavEl>
    </HStack>
}

const HeaderNavMobile = () => {
    return <VStack fontFamily="Onest" fontWeight="300" spacing={0} fontSize="24px" height="100%" pb="20px">
        <HeaderNavElModile><Link href="/airdrop">airdrop</Link></HeaderNavElModile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElModile><Link href="/profile">profile</Link></HeaderNavElModile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElModile><Link href="/whitepaper/">whitepaper</Link></HeaderNavElModile>
        <Spacer/>
        <WalletMultiButton/>
    </VStack>
}

const HeaderLinks = () => {

}

export const Header = () => {
    const size = useWindowSize();
    const {isOpen, onOpen, onClose} = useDisclosure();

    let sidePadding = "5.5%";
    if (size.width < 1100) sidePadding = "20px";

    return <>
        {
            size.width < 768 ?
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />

                <DrawerContent backgroundColor="#010201" pt="100px" position="relative">
                    <Box position="absolute" top="26px" right="5px" color="white" zIndex={3} onClick={onClose}>
                        <Icon as={AiOutlineClose} color="white" width="25px" height="25px"/>
                    </Box>
                    <Box height="77px" lineHeight="77px" position="fixed" left="0" top="0"
                         zIndex={2} backgroundColor="#010201" width="100%" pl="20px">
                        <Logo/>
                    </Box>
                    <Box height="4px" width="100%" backgroundColor="#D3CDC6" zIndex={1} filter="blur(12px)"
                         position="fixed" top="77px" left="0"/>
                    <HeaderNavMobile/>
                </DrawerContent>
            </Drawer> : ""
        }
        <HStack direction="row" padding={"0 " + sidePadding} w="100%" height="77px" zIndex={999} spacing={0}
                position="fixed" top="0" left="0" backgroundColor="#010201">
            {
                size.width >= 768?
                    <><Logo/> <HeaderNav/> <Spacer/> <WalletMultiButton/></> :
                    <><Center width="46px" height="100%" padding="0 10px" mr="20px" onClick={onOpen}>
                    <HamburgerIcon height="40px" width="40px"/>
                    </Center> <Logo/></>
            }

        </HStack>
        <Box height="4px" width="100vw" backgroundColor="#D3CDC6" zIndex={1} filter="blur(12px)"
        position="fixed" top="77px" left="0"/>
        </>
};