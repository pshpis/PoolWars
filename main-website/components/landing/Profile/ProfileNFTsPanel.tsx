import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useEffect, useMemo, useState} from "react";
import {Box, Center, Grid, GridItem, HStack, Img, Input, Text, useToast} from "@chakra-ui/react";

const NFT = ({src, maxValue, setChooseArr}) => {
    const toast = useToast();
    const NFTsName = src.slice(37).slice(0, -4);

    return <GridItem>
        <Box width="294px" height="352px">
            <Img width="294px" height="294px" borderTopRadius="24px"
                 src={src}/>
            <Box pt="11px" pl="24px" pb="16px" pr="24px" width="294px" height="58px" borderBottomRadius="24px"
                 fontWeight="600" fontSize="24px" lineHeight="36px" backgroundColor="#E8E8E8">
                <HStack spacing="auto">
                    <Text color="#949494">You have:</Text>
                    <Text color="#71CFC3">{maxValue}</Text>
                </HStack>
            </Box>
        </Box>
    </GridItem>
}

export const ProfileNFTSPanel = ({NFTsStats, setChooseArr}) => {
    const size = useWindowSize();

    const [NFTs, setNFTs] = useState([]);
    useEffect(() => {
        let newNFTs = [];
        NFTsStats.forEach((item) => {
            if (item.maxValue !== 0)
                newNFTs.push(<NFT src={item.src} setChooseArr={setChooseArr} maxValue={item.maxValue}/>);
        })
        newNFTs.filter(item => item.maxValue !== 0);
        setNFTs(newNFTs);
    }, [NFTsStats]);

    return <Box>
        <Center>
            <Grid mt="48px" templateColumns={size.width < 804 ? 'repeat(1, 1fr)' :size.width < 1112 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                  columnGap="24px" rowGap="24px">
                {NFTs}
            </Grid>
        </Center>
    </Box>
}