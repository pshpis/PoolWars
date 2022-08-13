import styles from "../../../styles/mint.module.scss";
import {Box, Flex} from "@chakra-ui/react";
import React, {MouseEvent} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import Layout from "../Layout/Layout";
import {useWallet} from "@solana/wallet-adapter-react";

export const SubmitWallet = () => {
    const size = useWindowSize();
    const wallet = useWallet();

    async function SubmitWallet(e: MouseEvent<HTMLDivElement>) {

    }

    return <Layout>
        <Flex h={size.height - 128 + "px"} w={size.width} alignItems="center" justifyContent="center">
            <Box w={size.width < 680 ? "290px" : ""} className={styles.mintButton} onClick={void(0)}>Submit Wallet</Box>
        </Flex>
    </Layout>
}