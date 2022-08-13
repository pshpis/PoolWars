import styles from "../../../styles/mint.module.scss";
import {Box, Flex, useToast} from "@chakra-ui/react";
import React, {MouseEvent, useEffect, useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import Layout from "../Layout/Layout";
import {useWallet} from "@solana/wallet-adapter-react";
import {getWalletStatus, submitWallet} from "../../../lib/wallet-submissions";

export const SubmitWallet = () => {
    const size = useWindowSize();
    const wallet = useWallet();
    const [walletStatus, setWalletStatus] = useState<boolean>(false);
    const [version, setVersion] = useState<number>(0);
    const toast = useToast();

    useEffect(() => {
        async function load() {
            if (wallet.publicKey) {
                const newWalletStatus = await getWalletStatus(wallet.publicKey.toBase58());
                setWalletStatus(_ => newWalletStatus);
            }
        }

        load();
    }, [wallet.publicKey]);

    async function SubmitWallet(e: MouseEvent<HTMLDivElement>) {
        try {
            if (!wallet.publicKey) {
                return;
            }

            const newWalletStatus = await submitWallet(wallet.publicKey.toBase58());
            setWalletStatus(_ => newWalletStatus);
        }
        catch (e) {
            if (!toast.isActive("userCancellation")) {
                toast({
                    id: "userCancellation",
                    title: 'Wallet submission error, please try again',
                    status: 'info',
                    position: 'top',
                    isClosable: true,
                });
            }
        }
        finally {
            setVersion(version+1);
        }
    }

    return <Layout>
        <Flex h={size.height - 128 + "px"} w={size.width} alignItems="center" justifyContent="center">
            <Box w={size.width < 680 ? "290px" : ""} className={styles.mintButton} onClick={walletStatus ? void(0) : SubmitWallet}>
                {walletStatus ? "Wallet Submited" : "Submit Wallet"}
            </Box>
        </Flex>
    </Layout>
}