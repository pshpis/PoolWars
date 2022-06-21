import {Box, Center, Grid, GridItem, Img} from "@chakra-ui/react";
import {Header} from "../Layout/Header/Header";
import {NftSwapsStats} from "./NftSwapsStats";
import {NftSwapsChoose} from "./NftSwapsChoose";
import {PoolWarsDivider} from "../Layout/PoolWarsDivider";
import {useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";

export const NftSwaps = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const size = useWindowSize();
    return <Box paddingTop="77px">
        <AllSpots/>
        <Header/>
        <Grid templateColumns="repeat(2, 1fr)" mt="77px" fontFamily="Onest" padding="0" mb="77px" rowGap="50px">
            <GridItem colSpan={size.width > 768 ? 1 : 2}>
                <NftSwapsStats totalPoints={totalPoints}/>
            </GridItem>
            <GridItem colSpan={size.width > 768 ? 1 : 2}>
                <Center>
                    <Img src="/increaseNft/9.png" width="320px" height="448px"/>
                </Center>
            </GridItem>
        </Grid>
        <PoolWarsDivider/>
        <Box height="77px"></Box>
        <NftSwapsChoose setTotalPoints={setTotalPoints}/>
    </Box>
}