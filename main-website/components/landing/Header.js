import {Box, Divider, HStack, Spacer, Stack} from "@chakra-ui/react";
import {ConnectWalletButton} from "../ConnectWalletButton";
import {Logo} from "./Logo";
import {MetaMaskButton} from "../MetaMaskButton";
import headerStyle from "../../styles/header.module.css";


const HeaderNavSpacer = () => {
    return <Box width="4.86vw"/>
}

const HeaderNavEl = ({children}) => {
    return <Box _hover={{color:"#333CED"}} transition="0.3s ease" ml={0}>{children}</Box>
}
const HeaderNav = () => {
    return <HStack fontFamily="Onest" fontWeight="300" spacing={0}>
        <HeaderNavEl>airdrop</HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl>roadmap</HeaderNavEl>
        <HeaderNavSpacer/>
        <HeaderNavEl>profile</HeaderNavEl>
    </HStack>
}

const HeaderLinks = () => {
  
}

export const Header = () => {
    return <>
        <HStack direction="row" padding="0 5.5%" w="100%" height="77px" zIndex={2} spacing={0}
                position="fixed" top="0" left="0" backgroundColor="#010201">
            <Logo/> <HeaderNav/> <Spacer/> <MetaMaskButton/>
        </HStack>
        <Box height="4px" width="100vw" backgroundColor="#D3CDC6" zIndex={1} filter="blur(12px)"
        position="fixed" top="77px" left="0"/>
        </>
};