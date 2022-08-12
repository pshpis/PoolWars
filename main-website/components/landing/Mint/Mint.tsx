import Layout from "../Layout/Layout";
import {
    Box,
    Center,
    Flex,
    Img,
    Stack,
    Text, useBoolean, useToast,
    VStack
} from "@chakra-ui/react";
import React, {MouseEvent, useEffect, useRef, useState} from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useWalletAuth } from "../../../hooks/useWalletAuth";
import { Keypair, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUserData, decodeMintData, getMintData, getUserData, MintData, mintOne, MINT_CONFIG_ADDRESS } from "../../../lib/mint-instructions";
import {useCookies} from "../../../hooks/useCookies";
import styles from "../../../styles/mint.module.scss"

const airdropAuthority = Keypair.fromSecretKey(new Uint8Array([87, 63, 47, 245, 211, 198, 55, 243, 138, 201, 237, 198, 57, 34, 88, 224, 234, 49, 51, 191, 224, 89, 45, 31, 199, 95, 209, 129, 178, 203, 158, 88, 135, 41, 24, 119, 139, 239, 142, 50, 14, 223, 31, 244, 177, 196, 221, 109, 149, 38, 54, 24, 206, 7, 176, 72, 52, 175, 40, 209, 211, 239, 86, 51]))

const MainText = ({marginBottom}) => {
    const size = useWindowSize();
    return <Box marginBottom={marginBottom} w="100%" fontFamily="Njord" fontWeight="400" textAlign="left">
        <Text fontSize={size.width < 500 ? "31px" : "61px"} color="#E8E8E8" lineHeight={size.width < 500 ? "29px" : "58px"}>Card&apos;s mint</Text>
        <Text fontSize={size.width < 500 ? "50px" : "100px"} color="#71CFC3" lineHeight={size.width < 500 ? "47px" : "95px"}>now Live!</Text>
    </Box>
}

const ProgressPanel = () => {
    const { connection } = useConnection();
    const [mintState, setMintState] = useState<MintData | undefined>();
    const srcWidth = 22;

    const loadedBarRef = useRef(null);
    const [loadedBarWidth, setLoadedBarWidth] = useState(0);
    useEffect(() => {
        if (mintState !== undefined)
            setLoadedBarWidth(loadedBarRef.current.offsetWidth);
    }, [loadedBarRef.current, mintState]);

    useEffect(() => {

        const load = async () => {
            const accountData = await getMintData(connection);
            const state = decodeMintData(accountData);
            setMintState(state);
        };

        connection.onAccountChange(MINT_CONFIG_ADDRESS, (accountInfo, _) => {
            const state = decodeMintData(accountInfo.data);
            setMintState(state);
        });

        load();
    },
        [])

    return <Box w="100%">
        {
            mintState === undefined
                ?
                <></>
                :
                <Box pl="7px" pr="7px">
                    <Text mb="5px" ml={loadedBarWidth-40+"px"} width="80px" textAlign="center"
                          fontWeight="600" fontSize="24px" lineHeight="28.13px" color="#B8C3E6">
                        {mintState.mintedAmount}
                    </Text>
                    <Img mb="8px" w={srcWidth} ml={loadedBarWidth-srcWidth/2+"px"} src="/triangle.svg"/>
                </Box>
        }
        <Box pt="6px" pl="7px" pr="7px" pb="6px" w="100%" h="64px" backgroundColor="#B2B2B2" borderRadius="24px" boxShadow="0px 0px 8px 0px #20202080 inset">
            {
                mintState === undefined
                    ?
                    <></>
                    :
                    <Box ref={loadedBarRef} w={mintState.mintedAmount/mintState.supply} h="52px" backgroundColor="#E8E8E8" borderLeftRadius="20px" boxShadow="0px 0px 4px 0px #20202040"></Box>
            }
        </Box>
        <Text mt="7px" pr="20px" fontWeight="600" fontSize="24px" lineHeight="28.13px" color="#B8C3E6" textAlign="right">Total: 10 000</Text>
    </Box>
}

export const Mint = () => {
    const size = useWindowSize();

    const toast = useToast();

    const walletAuthObj = useWalletAuth();
    const { connected } = walletAuthObj;
    const wallet = useWallet();
    const { connection } = useConnection();
    const {verify} = useCookies();
    const [load, setLoad] = useBoolean(true);

    async function mintClick(e: MouseEvent<HTMLDivElement>) {
        setLoad.off();

        try {
            if (!wallet.publicKey) {
                return;
            }

            const userData = await getUserData(wallet.publicKey, connection);
            const tx = new Transaction();
            tx.feePayer = wallet.publicKey;
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

            if (!userData) {
                tx.add(await createUserData(wallet.publicKey));
            }

            const mint = new Keypair();
            tx.add(await mintOne(wallet.publicKey, mint));

            tx.partialSign(mint, airdropAuthority);
            let signedTransaction: Transaction | null = undefined;

            try {
                signedTransaction = await wallet.signTransaction(tx);
            }
            catch (e) {
                if (!toast.isActive("userCancellation"))
                    toast({
                        id: "userCancellation",
                        title: 'Transaction canceled by user',
                        status: 'info',
                        position: 'top',
                        isClosable: true,
                    });
                return;
            }

            try {
                const result = await connection.sendRawTransaction(signedTransaction.serialize());
            }
            catch (e) {
                if (!toast.isActive("userCancellation"))
                    toast({
                        id: "blockchainCancellation",
                        title: 'Transaction canceled by blockchain',
                        status: 'info',
                        position: 'top',
                        isClosable: true,
                    });
                console.error(e)
            }
        }
        catch (e) {

        } finally {
            setLoad.on()
        }
    }

    useEffect(() => {
        if (size.width !== undefined && !verify)
            window.location.replace('/');
    }, [size.width]);

    return <Layout>
        {!connected ?
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Center>
                <Box mt="80px" mb="232px" maxW="1440px" w="100%" pl={size.width < 500 ? "24px" : "96px"} pr={size.width < 500 ? "24px" : "96px"}>
                    <Stack direction={size.width < 1260 ? "column" : "row"} spacing={size.width < 1260 ? "40px" : "auto"}>
                        <Center>
                            <VStack maxW="612px" spacing="0px">
                                <MainText marginBottom="56px"/>
                                <Box pb="51px" w="100%" borderTop="2px solid #E8E8E826"/>
                                <ProgressPanel/>
                                <Box h="16px"/>
                                <Stack direction={size.width < 670 ? "column" : "row"} spacing="23px">
                                    <Box className={styles.currentStageBox}>OG stage</Box>
                                    <Box className={styles.stageBox}>WL stage</Box>
                                    <Box className={styles.stageBox}>Public stage</Box>
                                </Stack>
                            </VStack>
                        </Center>
                        <VStack>
                            {
                                size.width < 680
                                    ?
                                    <Img w="212px" h="212px" src='/ezgif-3-fc8b60ab28.gif' borderRadius="40px" boxShadow="0px 4px 4px 0px #00000040"/>
                                    :
                                    <Img src='/ezgif-3-fc8b60ab28.gif' borderRadius="40px" boxShadow="0px 4px 4px 0px #00000040"/>
                            }
                            {
                                !load
                                ?
                                    <Flex alignItems="center" justifyContent="center">
                                        <div className={styles.smallDonut}/>
                                    </Flex>
                                    :
                                    <Box w={size.width < 680 ? "212px" : ""} className={styles.mintButton} onClick={mintClick}>MINT</Box>
                            }
                        </VStack>
                    </Stack>
                </Box>
            </Center>
        }
    </Layout>
}