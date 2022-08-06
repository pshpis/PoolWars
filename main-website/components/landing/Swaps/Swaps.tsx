import { useWindowSize } from "../../../hooks/useWindowSize";
import Layout from "../Layout/Layout";
import {
    Box, Center,
    Divider, Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import { ElderKattsBox } from "../Layout/ElderKattsBox";
import React, { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../../styles/swaps.module.scss";
import { NFTSPanel } from "../NFTsPanel";
import { SwapState, useKattsCardsSwaps } from "../../../hooks/useKattsCardsSwaps";
import clsx from "clsx";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NFTStat, NFTStatWithMints, parseCards } from "../../../lib/nft-helper";
import { useWalletAuth } from "../../../hooks/useWalletAuth";
import { ComputeBudgetInstruction, ComputeBudgetProgram, Keypair, PublicKey, SystemInstruction } from "@solana/web3.js";
import { swapCards, swapType, SWAP_AUTHORITY } from "../../../lib/swap-instructions";
import { Transaction } from "@solana/web3.js";
import { getSwapAuthoritySignature } from "../../../lib/swap-message-checker";
import { ChooseState, mapChooseStateToMints } from "../../../lib/shared";
import { useKattsCardsChoose } from "../../../hooks/useKattsCardsChoose";
import {useCookies} from "../../../hooks/useCookies";

const MainText = () => {
    const size = useWindowSize();
    return <Box maxWidth="427px" mr={size.width < 1040 ? "" : "20px"} textAlign={size.width < 1040 ? "center" : "initial"}>
        <Text fontFamily="Njord" fontWeight="400" fontSize="48px" lineHeight="55px" color="#E8E3DD">
            NFT SWAPS
        </Text>
        <Text mb="31px" fontFamily="Njord" fontWeight="400" fontSize="120px" lineHeight="114px" color="#71CFC3">
            LIVE!
        </Text>
        <Text fontWeight="300" fontSize="20px" lineHeight="30px" color="#E8E3DD">
            Here you can swap your regular warlords cards to take a Legendary one. Now you should choose some of your NFTs to burn 9 increase points.
        </Text>
    </Box>
}

const WillTakePointsPanel = ({ pointsPanelsHeight, swapState, onClick }: { pointsPanelsHeight: number, swapState: SwapState, onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    const [activePanel, setActivePanel] = useState()
    return <ElderKattsBox mt="24px" pb="32px" width="294px" height={pointsPanelsHeight + "px"}>

        <Text pt="24px" pb="28px"
            fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD" textAlign="center">
            You&apos;ll take card with:
        </Text>
        <HStack ml="24px" mr="24px" mb="32px" height="88xp" spacing="15px"
            fontFamily="Njord" fontWeight="400" fontSize="48px" lineHeight="88px" color="#71CFC3">
            {swapState.swapMods.map((mod, id) => {
                return <Box key={id} className={clsx(styles.willTakeCardButton,
                    id == swapState.currentModId ? styles.willTakeCardButton_clicked : null)} onClick={() => {
                        swapState.setCurrentModId(id)
                    }}>{mod.getPoints}</Box>
            })}
        </HStack>

        <Box onClick={onClick} ml="24px" mr="24px" maxWidth="246px" height="48px" backgroundColor="#B8C3E6" borderRadius="24px" textAlign="center"
            fontWeight="600" fontSize="24px" lineHeight="48px" color="#202020"
            transition="0.3s ease" _hover={{ boxShadow: "0px 0px 8px rgba(184, 195, 230, 0.75);" }}>
            SWAP
        </Box>
    </ElderKattsBox>
}

const SelectedPointsPanel = ({ sumPoints }) => {
    return <ElderKattsBox width="294px" mb="24px">
        <HStack>
            <Text pt="24px" pl="32px" pb="48px" pr="82px"
                fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                Selected<br /> points:
            </Text>
            <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                {sumPoints}
            </Text>
        </HStack>
    </ElderKattsBox>
}

const NeedPointsPanel = ({ needPointsPerOne }) => {
    return <ElderKattsBox width="294px">
        <HStack>
            <Text pt="24px" pl="32px" pb="48px" pr="37px"
                fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                Need points<br />per one:
            </Text>
            <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                {needPointsPerOne ? needPointsPerOne : "o"}
            </Text>
        </HStack>
    </ElderKattsBox>
}

const PointsPanels = ({ chooseState, swapState, onClick }: { chooseState: ChooseState, swapState: SwapState, onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    const size = useWindowSize();

    const pointsPanelsRef = useRef(null);
    const [pointsPanelsHeight, setPointsPanelsHeight] = useState(0);
    useEffect(() => {
        setPointsPanelsHeight(pointsPanelsRef.current.offsetHeight);
    }, [pointsPanelsRef.current]);

    return <Box>
        <HStack>
            <VStack ref={pointsPanelsRef} mr={size.width < 640 ? "" : "24px"}>
                <SelectedPointsPanel sumPoints={chooseState.sumPoints} />
                <NeedPointsPanel needPointsPerOne={swapState.currentMod.needPoints} />
            </VStack>
            {size.width >= 640 ? <WillTakePointsPanel onClick={onClick} pointsPanelsHeight={pointsPanelsHeight} swapState={swapState} /> : ""}
        </HStack>
        {size.width < 640 ? <WillTakePointsPanel onClick={onClick} pointsPanelsHeight={pointsPanelsHeight} swapState={swapState} /> : ""}
    </Box>
}

const TitleText = () => {
    const size = useWindowSize();
    const defaultTitleSize = useMemo(() => {
        if (size.width < 531) return 32;
        if (size.width < 646) return 48;
        return 64;
    }, [size.width]);

    return <HStack mt="80px" fontWeight="400" fontSize={defaultTitleSize + "px"} lineHeight="74px" spacing={0}
        w="100%" maxW="1248px" margin="0 auto">
        <Text fontFamily="Njord">CH</Text>
        <Text fontFamily="Njord Alternate">OO</Text>
        <Text fontFamily="Njord">SE NFTS</Text>
    </HStack>
}

export const Swaps = () => {
    const size = useWindowSize();
    const wallet = useWallet();
    const { connection } = useConnection();
    const walletAuthObj = useWalletAuth();
    const { connected } = walletAuthObj;
    const {verify} = useCookies();

    const defaultPadding = useMemo(() => {
        if (size.width < 486) return 30;
        return 96;
    }, [size.width])

    const chooseState = useKattsCardsChoose();
    const swapState = useKattsCardsSwaps();

    const [NFTsStats, setStats] = useState<NFTStatWithMints[]>([]);
    const [version, setVersion] = useState<number>(0);

    const versionInc = () => setVersion(v => v + 1);

    useEffect(() => {

        async function load() {
            const stats = await parseCards(wallet.publicKey, connection);
            console.log(stats);
            setStats(_ => stats);
        }

        load()
    },
        [wallet.publicKey, version]);

    useEffect(() => {
        if (size.width !== undefined && !verify)
            window.location.replace('/');
    }, [size.width]);

    async function swapClick(e: MouseEvent<HTMLDivElement>) {

        const mints = mapChooseStateToMints(chooseState, NFTsStats);
        let swap: swapType | undefined = undefined;

        if (swapState.currentMod.type === 'rare') {

            if (chooseState.sumPoints < 3 || chooseState.sumPoints >= 6) {
                return;
            }

            swap = '3'

        } else if (swapState.currentMod.type === 'epic') {

            if (chooseState.sumPoints < 6 || chooseState.sumPoints >= 9) {
                return;
            }

            swap = '6'
        } else if (swapState.currentMod.type === 'legendary') {


            if (chooseState.sumPoints < 9 || chooseState.sumPoints >= 15) {
                return;
            }

            swap = '9'
        }

        const mint = new Keypair();

        try {
            const ix = await swapCards(wallet.publicKey, mints, mint.publicKey, swap);

            const tx = new Transaction();
            tx.add(ComputeBudgetProgram.setComputeUnitLimit({
                units: 400000
            }));

            tx.add(ix);
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            tx.feePayer = wallet.publicKey;

            const signature = await getSwapAuthoritySignature(tx);

            if (!signature) {
                return;
            }

            const signedTransaction = await wallet.signTransaction(tx);
            signedTransaction.partialSign(mint);
            signedTransaction.addSignature(SWAP_AUTHORITY, signature);

            const result = await connection.sendRawTransaction(signedTransaction.serialize())
            versionInc();
        }
        catch (e) {
            console.error(e);
        }
    }

    return <Layout>
        {!connected ?

            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Box pt="80px" mb="160px" paddingLeft={defaultPadding + "px"} paddingRight={defaultPadding + "px"}>
                {size.width < 1040 ?
                    <VStack maxW="1248px" w="100%" margin="0 auto" spacing="30px">
                        <MainText />
                        <PointsPanels onClick={e => swapClick(e)} chooseState={chooseState} swapState={swapState} />
                    </VStack>
                    : <HStack maxW="1248px" w="100%" margin="0 auto" spacing="auto">
                        <MainText />
                        <PointsPanels onClick={e => swapClick(e)} chooseState={chooseState} swapState={swapState} />
                    </HStack>}

                <Divider maxW="1440px" margin="76px auto" borderColor="#E8E8E826" border="0.5px" />
                <TitleText />
                <NFTSPanel NFTsStats={NFTsStats} setChooseArr={chooseState.setChooseArr} />
            </Box>
        }

    </Layout>
}