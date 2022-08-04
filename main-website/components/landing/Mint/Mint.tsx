import Layout from "../Layout/Layout";
import {Box, Flex} from "@chakra-ui/react";
import React from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useWalletAuth} from "../../../hooks/useWalletAuth";

export const Mint = () => {
    const size = useWindowSize();

    const walletAuthObj = useWalletAuth();
    const {connected} = walletAuthObj;

    return <Layout>
        {!connected ?

            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">
                <Box w="300px" h="72px" backgroundColor="#202020" color="#71CFC3" border="2px" borderColor="#71CFC3"
                     borderRadius="20px"
                     fontWeight="400" fontSize="36px" lineHeight="68px" textAlign="center" transition="all 1s" _hover={{
                    backgroundColor: "#71CFC3",
                    color: "#202020",
                }}>Mint</Box>
            </Flex>
        }
    </Layout>
}