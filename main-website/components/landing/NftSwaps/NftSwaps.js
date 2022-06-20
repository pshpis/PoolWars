import {Box, Center, Grid, GridItem, Img} from "@chakra-ui/react";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {Header} from "../Layout/Header/Header";
import {NftSwapsStats} from "./NftSwapsStats";
import {NftSwapsChoose} from "./NftSwapsChoose";
import {PoolWarsDivider} from "../Layout/PoolWarsDivider";

export const NftSwaps = () => {
    return <Box paddingTop="77px">
        <FirstSpot/>
        <Header/>
        <Grid templateColumns="repeat(2, 1fr)" mt="77px" fontFamily="Onest" padding="0" mb="77px">
            <GridItem colSpan={1}>
                <NftSwapsStats/>
            </GridItem>
            <GridItem colSpan={1}>
                <Center>
                    <Img src="/increaseNft/8.png" width="320px" height="448px"/>
                </Center>
            </GridItem>
        </Grid>
        <PoolWarsDivider/>
        <Box height="77px"></Box>
        <NftSwapsChoose/>
    </Box>
}