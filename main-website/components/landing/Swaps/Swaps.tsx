import { useWindowSize } from "../../../hooks/useWindowSize";
import Layout from "../Layout/Layout";
import {
    Box, Divider, Flex,
    HStack,
    Text, useBoolean, useToast,
    VStack
} from "@chakra-ui/react";
import { ElderKattsBox } from "../Layout/ElderKattsBox";
import React, { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../../styles/swaps.module.scss";
import { NFTSPanel } from "../NFTsPanel";
import { SwapState, useKattsCardsSwaps } from "../../../hooks/useKattsCardsSwaps";
import clsx from "clsx";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NFTStatWithMints, parseCards } from "../../../lib/nft-helper";
import { useWalletAuth } from "../../../hooks/useWalletAuth";
import { ComputeBudgetProgram, Connection, Keypair} from "@solana/web3.js";
import { swapCards, swapType, SWAP_AUTHORITY } from "../../../lib/swap-instructions";
import { Transaction } from "@solana/web3.js";
import { getSwapAuthoritySignature } from "../../../lib/swap-message-checker";
import { ChooseState, mapChooseStateToMints } from "../../../lib/shared";
import { useKattsCardsChoose } from "../../../hooks/useKattsCardsChoose";

const MainText = () => {
    const size = useWindowSize();
    return <Box maxWidth="427px" mr={size.width < 1040 ? "" : "20px"} textAlign={size.width < 1040 ? "center" : "initial"}>
        <Text fontFamily="Njord" fontWeight="400" fontSize="48px" lineHeight="55px" color="#E8E3DD">
            NFT SWAPS
        </Text>
        <Text mb="10px" fontFamily="Njord" fontWeight="400" fontSize="120px" lineHeight="114px" color="#71CFC3">
            LIVE!
        </Text>
        <Text fontWeight="300" fontSize="20px" lineHeight="30px" color="#E8E3DD">
            Here you can swap (exchange) your Common, Rare and Epic Combat Cards to get a Legendary one! You have to combine 9 points in total to get one Legendary Combat Card with 12 power points.
        </Text>
    </Box>
}

const WillTakePointsPanel = ({ pointsPanelsHeight, swapState, onClick, cardsChooseNumber, loadClick }: { pointsPanelsHeight: number, swapState: SwapState, onClick: React.MouseEventHandler<HTMLDivElement>, cardsChooseNumber: number, loadClick: boolean }) => {
    const toast = useToast();

    function moteThan4CardsToast() {
        if (cardsChooseNumber > 4 && !toast.isActive("moreThan4Cards")) {

        }
        return void(0);
    }

    function swapClick(e : MouseEvent<HTMLDivElement>) {
        if (cardsChooseNumber > 4 && !toast.isActive("moreThan4Cards")) {
            toast({
                id: "moreThan4Cards",
                title: 'Impossible to swap more than 4 NFTs',
                status: 'info',
                position: 'top',
                isClosable: true,
            });
            return;
        }
        if (cardsChooseNumber === 0 && !toast.isActive("0Cards")) {
            toast({
                id: "0Cards",
                title: 'It is necessary to select cards for swap',
                status: 'info',
                position: 'top',
                isClosable: true,
            });
            return;
        }
        onClick(e);
    }

    return <ElderKattsBox mt="24px" pb="32px" width="294px" height={pointsPanelsHeight + "px"}>

        <Text pt="24px" pb="28px"
            fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD" textAlign="center">
            Converted Card&apos;s points:
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

        {
            loadClick
                ?
                <Box onClick={swapClick} ml="24px" mr="24px" maxWidth="246px" height="48px" backgroundColor="#B8C3E6" borderRadius="24px" textAlign="center"
                     fontWeight="600" fontSize="24px" lineHeight="48px" color="#202020"
                     transition="0.3s ease" _hover={{ boxShadow: "0px 0px 8px rgba(184, 195, 230, 0.75);" }} cursor="pointer">
                    SWAP
                </Box>
                :
                <Flex alignItems="center" justifyContent="center">
                    <div className={styles.smallDonut}/>
                </Flex>
        }

    </ElderKattsBox>
}

const SelectedPointsPanel = ({ chooseState } : { chooseState: ChooseState }) => {
    return <ElderKattsBox width="294px" mb="24px">
        <HStack spacing="auto">
            <Text pt="24px" pl="32px" pb="48px" pr="82px"
                fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                Selected<br/> points:
            </Text>
            <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                {chooseState.sumPoints}
            </Text>
        </HStack>
    </ElderKattsBox>
}

const NeedPointsPanel = ({ needPointsPerOne }) => {
    return <ElderKattsBox width="294px">
        <HStack spacing="auto">
            <Text pt="24px" pl="32px" pb="48px" pr="37px"
                fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                Needed<br /> points:
            </Text>
            <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                {needPointsPerOne ? needPointsPerOne : "o"}
            </Text>
        </HStack>
    </ElderKattsBox>
}

const PointsPanels = ({ chooseState, swapState, onClick, cardsChooseNumber, loadClick}: { chooseState: ChooseState, swapState: SwapState, onClick: React.MouseEventHandler<HTMLDivElement>, cardsChooseNumber: number, loadClick: boolean }) => {
    const size = useWindowSize();

    const toast = useToast();

    useEffect(() => {
        if (cardsChooseNumber > 4 && !toast.isActive("moreThan4Cards")) {
            toast({
                id: "moreThan4Cards",
                title: 'Impossible to swap more than 4 NFTs',
                status: 'info',
                position: 'top',
                isClosable: true,
            });
        }
    }, [cardsChooseNumber]);



    const pointsPanelsRef = useRef(null);
    const [pointsPanelsHeight, setPointsPanelsHeight] = useState(0);
    useEffect(() => {
        setPointsPanelsHeight(pointsPanelsRef.current.offsetHeight);
    }, [pointsPanelsRef.current]);

    return <Box>
        <HStack>
            <VStack ref={pointsPanelsRef} mr={size.width < 640 ? "" : "24px"}>
                <SelectedPointsPanel chooseState={chooseState} />
                <NeedPointsPanel needPointsPerOne={swapState.currentMod.needPoints} />
            </VStack>
            {size.width >= 640 ? <WillTakePointsPanel onClick={onClick} pointsPanelsHeight={pointsPanelsHeight} swapState={swapState} cardsChooseNumber={cardsChooseNumber} loadClick={loadClick}/> : ""}
        </HStack>
        {size.width < 640 ? <WillTakePointsPanel onClick={onClick} pointsPanelsHeight={pointsPanelsHeight} swapState={swapState} cardsChooseNumber={cardsChooseNumber} loadClick={loadClick}/> : ""}
    </Box>
}

export const Swaps = () => {
    const ids = [{ id : "defence_1" },
    { id : "intelligence_1" },
    { id : "attack_3" },
    { id : "defence_3" },
    { id : "intelligence_3" },
    { id : "attack_6" },
    { id : "defence_6" },
    { id : "intelligence_6" },
    { id : "attack_12" },
    { id : "defence_12" },
    { id : "intelligence_12" }];

    const size = useWindowSize();
    const wallet = useWallet();
    const { connection } = useConnection();
    const walletAuthObj = useWalletAuth();
    const { connected } = walletAuthObj;

    const defaultPadding = useMemo(() => {
        if (size.width < 486) return 30;
        return 96;
    }, [size.width])

    const chooseState = useKattsCardsChoose();
    const swapState = useKattsCardsSwaps();

    const [NFTsStats, setStats] = useState<NFTStatWithMints[]>([]);
    const [version, setVersion] = useState<number>(0);
    const [load, setLoad] = useState<boolean>(false);

    const [loadClick, setLoadClick] = useBoolean(true);

    const versionInc = () => setVersion(v => v + 1);

    useEffect(() => {

        async function load() {
            setLoad(_ => false);
            const stats = await parseCards(wallet.publicKey, connection);
            console.log(stats);
            setStats(_ => stats);
            setLoad(_ => true);
        }

        load()
    },
        [wallet.publicKey, version]);

    async function swapClick(e: MouseEvent<HTMLDivElement>) {
        setLoadClick.off();
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

        ids.forEach((item) => chooseState.setChooseArr(item.id, 0));

        try {
            const ix = await swapCards(wallet.publicKey, mints, mint.publicKey, swap);

            const tx = new Transaction();
            tx.add(ComputeBudgetProgram.setComputeUnitLimit({
                units: 400000
            }));

            tx.add(ix);
            tx.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
            tx.feePayer = wallet.publicKey;

            const signedTransaction = await wallet.signTransaction(tx);
            const signature = await getSwapAuthoritySignature(tx);

            if (!signature) {
                console.log('No signature returned')
                return;
            }

            tx.addSignature(wallet.publicKey, signedTransaction.signature)
            tx.partialSign(mint);
            tx.addSignature(SWAP_AUTHORITY, signature);

            const result = await connection.simulateTransaction(tx);
            console.log(result.value.logs);
            
            const solConnection = new Connection('https://solana-api.projectserum.com');
            await solConnection.sendRawTransaction(tx.serialize())

            versionInc();
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoadClick.on();
            versionInc();
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
                        <PointsPanels onClick={e => swapClick(e)} chooseState={chooseState} swapState={swapState} cardsChooseNumber={chooseState.cardsChooseNumber} loadClick={loadClick}/>
                    </VStack>
                    : <HStack maxW="1248px" w="100%" margin="0 auto" spacing="auto">
                        <MainText />
                        <PointsPanels onClick={e => swapClick(e)} chooseState={chooseState} swapState={swapState} cardsChooseNumber={chooseState.cardsChooseNumber} loadClick={loadClick}/>
                    </HStack>}

                <Divider maxW="1440px" margin="76px auto" borderColor="#E8E8E826" border="0.5px" />
                {!load ?
                    <Flex alignItems="center" justifyContent="center">
                        <div className={styles.donut}/>
                    </Flex>
                    :
                    <NFTSPanel NFTsStats={NFTsStats} setChooseArr={chooseState.setChooseArr}/>
                }
            </Box>
        }

    </Layout>
}