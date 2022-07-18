import {
    background,
    Box, Button, Center,
    Drawer, DrawerContent,
    DrawerOverlay,
    HStack, Icon,
    Spacer, Text, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {HamburgerIcon} from "@chakra-ui/icons";
import Link from "next/link";
import {AiOutlineClose} from "react-icons/ai";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import styles from '../../../../styles/header.module.css'
import {useEffect, useMemo, useState} from "react";
import {useWallet} from "@solana/wallet-adapter-react";

const HeaderNavSpacer = () => {
    return <Box width="3vw"/>
}

const HeaderNavSpacerMobile = () => {
    return <Box height="4vh"/>
}

const HeaderNavEl = ({children}) => {
    return <Box _hover={{color: "#B8C3E6"}} transition="0.3s ease" ml={0}>{children}</Box>
}

const HeaderNavElModile = ({children}) => {
    return <Box _hover={{color: "#B8C3E6"}} transition="0.3s ease" ml={0} w="100%" pl="20px">{children}</Box>
}

const HeaderNav = () => {
    return <HStack fontStyle="light" color="#B2B2B2" fontFamily="Roboto Flex" fontWeight="300" spacing={0}>
        <HeaderNavEl><Link href="/airdrop">airdrop</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/profile">profile</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/nft-swaps">swaps</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/pool-wars-v0">events</Link></HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl><Link href="/whitepaper/">whitepaper</Link></HeaderNavEl>
    </HStack>
}

const HeaderNavMobile = () => {
    return <VStack fontStyle="light" color="#B2B2B2" fontFamily="Roboto Flex" fontWeight="300" spacing={0} fontSize="24px" height="100%" pb="20px">
        <HeaderNavElModile><Link href="/airdrop">airdrop</Link></HeaderNavElModile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElModile><Link href="/profile">profile</Link></HeaderNavElModile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElModile><Link href="/nft-swaps">swaps</Link></HeaderNavElModile>
        <HeaderNavSpacerMobile/>
        <HeaderNavElModile><Link href="/pool-wars-v0">events</Link></HeaderNavElModile>
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

    const { publicKey, connected, connecting } = useWallet();
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const walletButtonContent = useMemo(() => {
        if (!connected) return "Select Wallet";
        if (connecting) return "Connecting...";
        return base58.slice(0, 5) + '...' + base58.slice(-5);
    }, [connected, connecting]);

    return <>
        {
            size.width < 768 ?
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />

                <DrawerContent backgroundColor="#202020" pt="100px" position="relative">
                    <Box position="absolute" top="26px" right="5px" color="white" zIndex={3} onClick={onClose}>
                        <Icon as={AiOutlineClose} color="white" width="25px" height="25px"/>
                    </Box>
                    <Box height="64px" lineHeight="64px" position="fixed" left="0" top="0"
                         zIndex={2} backgroundColor="#010201" width="100%" pl="20px">
                        <Logo/>
                    </Box>
                    <Box height="4px" width="100%" backgroundColor="#D3CDC6" zIndex={1} filter="blur(12px)"
                         position="fixed" top="64px" left="0"/>
                    <HeaderNavMobile/>
                </DrawerContent>
            </Drawer> : ""
        }
        <HStack direction="row" padding={"0 " + sidePadding} w="100%" height="64px" zIndex={999} spacing={0}
                position="fixed" top="0" left="0" backgroundColor="#202020">
            {
                size.width >= 768?
                    <><Logo/> <HeaderNav/> <Spacer/>
                        <WalletMultiButton className={styles.walletMultiButton} startIcon="">
                            <Button
                                    height="40px"
                                    width="188px"
                                    background="#202020"
                                    color="#71CFC3"
                                    border="2px"
                                    borderRadius="16px"
                                    fontSize="16px"
                                    fontWeight="600"
                                    fontStyle="semiBold"
                                    fontFamily="Roboto Flex"
                                    _hover={{
                                background: "#71CFC3",
                                color: "#202020",
                                border: "2px solid #71CFC3",
                            }}>
                                {walletButtonContent}
                            </Button>
                        </WalletMultiButton></> :
                    <><Center width="46px" height="100%" padding="0 10px" mr="20px" onClick={onOpen}>
                    <HamburgerIcon height="40px" width="40px"/>
                    </Center> <Logo/></>
            }

        </HStack>
        <Box height="4px" width="100vw" backgroundColor="#202020" zIndex={1} offset="0px 4px"
             boxShadow="0px 4px 4px 0px #E8E8E826"
            position="fixed" top="64px" left="0"/>
        </>
};