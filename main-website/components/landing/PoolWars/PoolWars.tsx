import Layout from "../Layout/Layout";
import {Box, Divider, Grid, HStack, Text, VStack} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useMemo} from "react";
import {NFTSPanel} from "../NFTsPanel";
import {useKattsCardsChoose} from "../../../hooks/useKattsCardsChoose";

// const MainText = () => {
//     const size = useWindowSize();
//     return <Box maxWidth="507px" mr={size.width < 1040 ? "" : "20px"} textAlign={size.width < 1040 ? "center" : ""}>
//         <Text fontFamily="Njord" fontWeight="400" fontSize="80px" lineHeight="92px">POOL WARS</Text>
//         <Text fontFamily="Njord" fontWeight="400" fontSize="64px" lineHeight="92px">EVENT V0</Text>
//         <Text fontFamily="Njord" fontWeight="400" fontSize="48px" lineHeight="92px">LIVE!</Text>
//     </Box>
// }

export const PoolWars = () => {
    const size = useWindowSize();

    const defaultPadding = useMemo(() => {
        if (size.width < 486) return 30;
        return 96;
    }, [size.width])

    const kattsCardChoose = useKattsCardsChoose();
    const {chooseArr, setChooseArr, sumPoints, needPointsPerOne, setWillTakeCardPoints} = kattsCardChoose;

    const NFTsStats = [ {src: "/increaseNft/attack_1.png", maxValue: 10},
        {src: "/increaseNft/defence_1.png", maxValue: 10},
        {src: "/increaseNft/intelligence_1.png", maxValue: 10},
        {src: "/increaseNft/attack_3.png", maxValue: 10},
        {src: "/increaseNft/defence_3.png", maxValue: 10},
        {src: "/increaseNft/intelligence_3.png", maxValue: 10},
        {src: "/increaseNft/attack_6.png", maxValue: 10},
        {src: "/increaseNft/defence_6.png", maxValue: 10},
        {src: "/increaseNft/intelligence_6.png", maxValue: 10}
    ];

    return <Layout>
        <Box pt="80px" mb="160px" paddingLeft={defaultPadding+"px"} paddingRight={defaultPadding+"px"}>
            {/*{size.width < 1040 ?*/}
            {/*    <VStack maxW="1248px" w="100%" margin="0 auto" spacing="30px">*/}
            {/*        <MainText/>*/}
            {/*        <PointsPanels chooseArr={chooseArr} sumPoints={sumPoints} needPointsPerOne={needPointsPerOne} setWillTakeCardPoints={setWillTakeCardPoints}/>*/}
            {/*    </VStack>*/}
            {/*    : <HStack maxW="1248px" w="100%" margin="0 auto" spacing="auto">*/}
            {/*        <MainText/>*/}
            {/*        <PointsPanels chooseArr={chooseArr} sumPoints={sumPoints} needPointsPerOne={needPointsPerOne} setWillTakeCardPoints={setWillTakeCardPoints}/>*/}
            {/*    </HStack>}*/}
            <Grid>
                {/*<MainText/>*/}
            </Grid>

            <NFTSPanel NFTsStats={NFTsStats} setChooseArr={setChooseArr}/>
        </Box>
    </Layout>
}