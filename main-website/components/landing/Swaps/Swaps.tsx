import {useWindowSize} from "../../../hooks/useWindowSize";
import Layout from "../Layout/Layout";
import {
    background,
    Box,
    Center,
    Divider,
    Grid,
    GridItem,
    HStack,
    Img,
    Input,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {ElderKattsBox} from "../Layout/ElderKattsBox";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {value} from "dom7";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useKattsCardsChoose} from "../../../hooks/useKattsCardsChoose";
import {inspect} from "util";
import styles from "../../../styles/swaps.module.scss";

const MainText = () => {
    const size = useWindowSize();
    // @ts-ignore
    return <Box maxWidth="427px" mr={size.width < 1040 ? "" : "20px"} textAlign={size.width < 1040 ? "center" : ""}>
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

const WillTakePointsPanel = ({pointsPanelsHeight, setWillTakeCardPoints}) => {
    return <ElderKattsBox mt="24px" pb="32px" width="294px"  height={pointsPanelsHeight+"px"}>

        <Text pt="24px" pb="28px"
              fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD" textAlign="center">
            You''ll take card with:
        </Text>
        <HStack ml="24px" mr="24px" mb="32px" height="88xp" spacing="15px"
                fontFamily="Njord" fontWeight="400" fontSize="48px" lineHeight="88px" color="#71CFC3">
            <Box className={styles.willTakeCardButton} onClick={() => {
                setWillTakeCardPoints(+3)
            }}>3</Box>
            <Box className={styles.willTakeCardButton}  onClick={() => {setWillTakeCardPoints(+6)}}>6</Box>
            <Box className={styles.willTakeCardButton}  onClick={() => {setWillTakeCardPoints(+12)}}>12</Box>
        </HStack>

        <Box ml="24px" mr="24px" maxWidth="246px" height="48px" background="#B8C3E6" borderRadius="24px" textAlign="center"
             fontWeight="600" fontSize="24px" lineHeight="48px" color="#202020"
             transition="0.3s ease" _hover={{boxShadow: "0px 0px 8px rgba(184, 195, 230, 0.75);"}}>
            SWAP
        </Box>
    </ElderKattsBox>
}

const PointsPanels = ({chooseArr, sumPoints, needPointsPerOne, setWillTakeCardPoints}) => {
    const size = useWindowSize();

    const pointsPanelsRef = useRef(null);
    const [pointsPanelsHeight, setPointsPanelsHeight] = useState(0);
    useEffect(() => {
        setPointsPanelsHeight(pointsPanelsRef.current.offsetHeight);
    }, [pointsPanelsRef.current]);

    useEffect(() => {
        console.log(chooseArr);
    }, [size.width])
    
    return <Box>
        <HStack>
            <VStack ref={pointsPanelsRef} mr={size.width < 640 ? "" : "24px"}>
                <ElderKattsBox width="294px" mb="24px">
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
                <ElderKattsBox width="294px">
                    <HStack>
                        <Text pt="24px" pl="32px" pb="48px" pr="37px"
                              fontWeight="600" fontSize="24px" lineHeight="28px" color="#E8E3DD">
                            Need points<br/>per one:
                        </Text>
                        <Text pt="32px" pr="16px" pb="4px" mr="auto" textAlign="right"
                              fontFamily="Njord Alternate" fontWeight="400" fontSize="80px" lineHeight="92px" color="#71CFC3">
                            {needPointsPerOne}
                        </Text>
                    </HStack>
                </ElderKattsBox>
            </VStack>
            {size.width >= 640 ? <WillTakePointsPanel pointsPanelsHeight={pointsPanelsHeight} setWillTakeCardPoints={setWillTakeCardPoints}/> : ""}
        </HStack>
        {size.width < 640 ? <WillTakePointsPanel pointsPanelsHeight={pointsPanelsHeight} setWillTakeCardPoints={setWillTakeCardPoints}/> : ""}
    </Box>
}

const numberCardInArray = (src) => {
    return src.slice(13).slice(0, -4);
    // const stat = src.slice(0, -2);
    // const points = src.slice(-1);
    // let numberCardInArray = 1;
    // switch (stat) {
    //     case "attack":
    //         numberCardInArray = 0;
    //         break;
    //     case "defence":
    //         numberCardInArray = 1;
    //         break;
    //     case "intelligence":
    //         numberCardInArray = 2;
    //         break;
    //     default:
    //         break;
    // }
    // switch (points) {
    //     case "1":
    //         break;
    //     case "3":
    //         numberCardInArray += 3;
    //         break;
    //     case "6":
    //         numberCardInArray += 6;
    //         break;
    //     default:
    //         break;
    // }
    // return numberCardInArray;
}

const NFT = ({src, chooseArr, setChooseArr}) => {
    const arrayNumber = numberCardInArray(src);
    return <GridItem>
        <Box width="294px" height="398px">
            <Img width="294px" height="294px" borderTopRadius="24px"
                 src={src}/>
            <Box pt="11px" pl="24px" pb="16px" pr="24px" width="294px" height="104px" borderBottomRadius="24px"
                 fontWeight="600" fontSize="24px" lineHeight="36px" background="#E8E8E8">
                <HStack spacing="auto">
                    <Text color="#949494">You have:</Text>
                    <Text color="#71CFC3">0</Text>
                </HStack>
                <HStack spacing="auto">
                    <Text w="150px" color="#949494">You choose:</Text>
                    <Input p="0" mr="auto" w="30px" type="text"
                           placeholder="0" fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3"
                           textAlign="right" border="0px" _placeholder={{
                               color: 'inherit',
                    }}
                           onInput={(evt) => {
                               // @ts-ignore
                                setChooseArr(arrayNumber, +evt.target.value);
                           }}
                    ></Input>
                </HStack>
            </Box>
        </Box>
    </GridItem>
}

const NFTSPanel = ({chooseArr, setChooseArr}) => {
    const size = useWindowSize();

    return <Center>
        <Grid mt="48px" templateColumns={size.width < 660 ? 'repeat(1, 1fr)' :size.width < 978 ? 'repeat(2, 1fr)' : size.width < 1296 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'}
              columnGap="24px" rowGap="24px">
            <NFT src="/increaseNft/attack_1.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/defence_1.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/intelligence_1.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/attack_3.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/defence_3.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/intelligence_3.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/attack_6.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/defence_6.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
            <NFT src="/increaseNft/intelligence_6.png" setChooseArr={setChooseArr} chooseArr={chooseArr}/>
        </Grid>
    </Center>
}

const TitleText = () => {
    const size = useWindowSize();
    const defaultTitleSize = useMemo(() => {
        if (size.width < 531) return 32;
        if (size.width < 646) return 48;
        return 64;
    }, [size.width]);

    return <HStack mt="80px" fontWeight="400" fontSize={defaultTitleSize+"px"} lineHeight="74px" spacing={0}
                   w="100%" maxW="1440px" margin="0 auto">
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

    const kattsCardChoose = useKattsCardsChoose();
    const {chooseArr, setChooseArr, sumPoints, needPointsPerOne, setWillTakeCardPoints} = kattsCardChoose;

    return <Layout>
        <Box pt="80px" mb="160px" paddingLeft={defaultPadding+"px"} paddingRight={defaultPadding+"px"}>
            {size.width < 1040 ?
                <VStack maxW="1248px" w="100%" margin="0 auto" spacing="30px">
                    <MainText/>
                    <PointsPanels chooseArr={chooseArr} sumPoints={sumPoints} needPointsPerOne={needPointsPerOne} setWillTakeCardPoints={setWillTakeCardPoints}/>
                </VStack>
                : <HStack maxW="1248px" w="100%" margin="0 auto" spacing="auto">
                <MainText/>
                <PointsPanels chooseArr={chooseArr} sumPoints={sumPoints} needPointsPerOne={needPointsPerOne} setWillTakeCardPoints={setWillTakeCardPoints}/>
            </HStack>}

            <Divider maxW="1440px" margin="76px auto" borderColor="#E8E8E826" border="0.5px"/>
            <TitleText/>
            <NFTSPanel chooseArr={chooseArr} setChooseArr={setChooseArr}/>
        </Box>
    </Layout>
}