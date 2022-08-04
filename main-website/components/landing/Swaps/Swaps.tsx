import {useWindowSize} from "../../../hooks/useWindowSize";
import Layout from "../Layout/Layout";
import {
    Box,
    Divider,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import {ElderKattsBox} from "../Layout/ElderKattsBox";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {ChooseState, useKattsCardsChoose} from "../../../hooks/useKattsCardsChoose";
import styles from "../../../styles/swaps.module.scss";
import {NFTSPanel} from "../NFTsPanel";
import {SwapState, useKattsCardsSwaps} from "../../../hooks/useKattsCardsSwaps";
import clsx from "clsx";

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

const WillTakePointsPanel = ({pointsPanelsHeight, swapState} : {pointsPanelsHeight: number, swapState: SwapState}) => {
    const [activePanel, setActivePanel] = useState()
    return <ElderKattsBox mt="24px" pb="32px" width="294px"  height={pointsPanelsHeight+"px"}>

        <Text pt="24px" pb="28px"
              fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD" textAlign="center">
            You&apos;ll take card with:
        </Text>
        <HStack ml="24px" mr="24px" mb="32px" height="88xp" spacing="15px"
                fontFamily="Njord" fontWeight="400" fontSize="48px" lineHeight="88px" color="#71CFC3">
            {swapState.swapMods.map((mod, id) => {
                return <Box key={id} className={clsx(styles.willTakeCardButton,
                    id == swapState.currentModId ? styles.willTakeCardButton_clicked: null)} onClick={() => {
                    swapState.setCurrentModId(id)
                }}>{mod.getPoints}</Box>
            })}
        </HStack>

        <Box ml="24px" mr="24px" maxWidth="246px" height="48px" backgroundColor="#B8C3E6" borderRadius="24px" textAlign="center"
             fontWeight="600" fontSize="24px" lineHeight="48px" color="#202020"
             transition="0.3s ease" _hover={{boxShadow: "0px 0px 8px rgba(184, 195, 230, 0.75);"}}>
            SWAP
        </Box>
    </ElderKattsBox>
}

const SelectedPointsPanel = ({sumPoints}) => {
    return <ElderKattsBox width="294px" mb="24px">
        <HStack>
            <Text pt="24px" pl="32px" pb="48px" pr="82px"
                  fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                Selected<br/> points:
            </Text>
            <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                  fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                {sumPoints}
            </Text>
        </HStack>
    </ElderKattsBox>
}

const NeedPointsPanel = ({needPointsPerOne}) => {
    return <ElderKattsBox width="294px">
        <HStack>
            <Text pt="24px" pl="32px" pb="48px" pr="37px"
                  fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                Need points<br/>per one:
            </Text>
            <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                  fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                {needPointsPerOne ? needPointsPerOne : "o"}
            </Text>
        </HStack>
    </ElderKattsBox>
}

const PointsPanels = ({chooseState, swapState}: { chooseState: ChooseState, swapState: SwapState}) => {
    const size = useWindowSize();

    const pointsPanelsRef = useRef(null);
    const [pointsPanelsHeight, setPointsPanelsHeight] = useState(0);
    useEffect(() => {
        setPointsPanelsHeight(pointsPanelsRef.current.offsetHeight);
    }, [pointsPanelsRef.current]);

    useEffect(() => {
        console.log(chooseState.chooseArr);
    }, [chooseState.chooseArr, size.width])

    return <Box>
        <HStack>
            <VStack ref={pointsPanelsRef} mr={size.width < 640 ? "" : "24px"}>
                <SelectedPointsPanel sumPoints={chooseState.sumPoints}/>
                <NeedPointsPanel needPointsPerOne={swapState.currentMod.needPoints}/>
            </VStack>
            {size.width >= 640 ? <WillTakePointsPanel pointsPanelsHeight={pointsPanelsHeight} swapState={swapState}/> : ""}
        </HStack>
        {size.width < 640 ? <WillTakePointsPanel pointsPanelsHeight={pointsPanelsHeight} swapState={swapState}/> : ""}
    </Box>
}

const TitleText = () => {
    const size = useWindowSize();
    const defaultTitleSize = useMemo(() => {
        if (size.width < 531) return 32;
        if (size.width < 646) return 48;
        return 64;
    }, [size.width]);

    return <HStack mt="80px" fontWeight="400" fontSize={defaultTitleSize+"px"} lineHeight="74px" spacing={0}
                   w="100%" maxW="1248px" margin="0 auto">
        <Text fontFamily="Njord">CH</Text>
        <Text fontFamily="Njord Alternate">OO</Text>
        <Text fontFamily="Njord">SE NFTS</Text>
    </HStack>
}

export const Swaps = () => {
    const size = useWindowSize();


    const defaultPadding = useMemo(() => {
        if (size.width < 486) return 30;
        return 96;
    }, [size.width])

    const chooseState = useKattsCardsChoose();
    const swapState = useKattsCardsSwaps();

    const NFTsStats = [ {src: "/increaseNft/attack_1.png", maxValue: 10},
        {src: "/increaseNft/defence_1.png", maxValue: 10},
        {src: "/increaseNft/intelligence_1.png", maxValue: 10},
        {src: "/increaseNft/attack_3.png", maxValue: 10},
        {src: "/increaseNft/defence_3.png", maxValue: 10},
        {src: "/increaseNft/intelligence_3.png", maxValue: 10},
        {src: "/increaseNft/attack_6.png", maxValue: 10},
        {src: "/increaseNft/defence_6.png", maxValue: 10},
        {src: "/increaseNft/intelligence_6.png", maxValue: 10},
    ];

    return <Layout>
        <Box pt="80px" mb="160px" paddingLeft={defaultPadding+"px"} paddingRight={defaultPadding+"px"}>
            {size.width < 1040 ?
                <VStack maxW="1248px" w="100%" margin="0 auto" spacing="30px">
                    <MainText/>
                    <PointsPanels chooseState={chooseState} swapState={swapState}/>
                </VStack>
                : <HStack maxW="1248px" w="100%" margin="0 auto" spacing="auto">
                    <MainText/>
                    <PointsPanels chooseState={chooseState} swapState={swapState}/>
                </HStack>}

            <Divider maxW="1440px" margin="76px auto" borderColor="#E8E8E826" border="0.5px"/>
            <TitleText/>
            <NFTSPanel NFTsStats={NFTsStats} setChooseArr={chooseState.setChooseArr}/>
        </Box>
    </Layout>
}