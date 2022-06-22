import {Box, Center, Grid, GridItem, Heading, Img} from "@chakra-ui/react";
import {Header} from "../Layout/Header/Header";
import {NftSwapsStats} from "./NftSwapsStats";
import {WarlordsCardsChoose} from "./WarlordsCardsChoose";
import {PoolWarsDivider} from "../Layout/PoolWarsDivider";
import {useEffect, useRef, useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";
import {useWarlordsCardsChoose} from "../../../hooks/useWarlordsCardsChoose";
import {Footer} from "../Layout/Footer/Footer";

export const NftSwaps = () => {
    const [chooseArr, setChooseArr, getSumPoints] = useWarlordsCardsChoose();

    const chooseRef = useRef(null);
    const size = useWindowSize();
    return <Box paddingTop="77px">
        <AllSpots/>
        <Header/>
        <Grid templateColumns="repeat(2, 1fr)" mt="77px" fontFamily="Onest" padding="0" mb="77px" rowGap="50px">
            <GridItem colSpan={size.width > 768 ? 1 : 2}>
                <NftSwapsStats totalPoints={getSumPoints()} chooseRef={chooseRef}/>
            </GridItem>
            <GridItem colSpan={size.width > 768 ? 1 : 2}>
                <Center>
                    <Img src="/increaseNft/9.png" width="320px" height="448px"/>
                </Center>
            </GridItem>
        </Grid>
        <PoolWarsDivider/>
        <Box mt="77px" ref={chooseRef}>
            <Heading fontSize="40px" fontFamily="Trap" textAlign="center" mb="20px">Choose nfts</Heading>
            <WarlordsCardsChoose chooseArr={chooseArr} setChooseArr={setChooseArr}/>
        </Box>
        <Footer marginTop="100px"/>
    </Box>
}