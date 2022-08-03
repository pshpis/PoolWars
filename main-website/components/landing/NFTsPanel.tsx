import {useWindowSize} from "../../hooks/useWindowSize";
import React, {useEffect, useState} from "react";
import {Box, Center, Grid, GridItem, HStack, Img, Input, Text} from "@chakra-ui/react";

const NFT = ({src, chooseArr, setChooseArr}) => {
    const NFTsName = src.slice(13).slice(0, -4);
    return <GridItem>
        <Box width="294px" height="398px">
            <Img width="294px" height="294px" borderTopRadius="24px"
                 src={src}/>
            <Box pt="11px" pl="24px" pb="16px" pr="24px" width="294px" height="104px" borderBottomRadius="24px"
                 fontWeight="600" fontSize="24px" lineHeight="36px" backgroundColor="#E8E8E8">
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
                               setChooseArr(NFTsName, +evt.target.value);
                           }}
                    ></Input>
                </HStack>
            </Box>
        </Box>
    </GridItem>
}

export const NFTSPanel = ({srcs, chooseArr, setChooseArr}) => {
    const size = useWindowSize();

    const [NFTs, setNFTs] = useState([]);
    useEffect(() => {
        let newNFTs = [...NFTs];
        srcs.forEach((src) => {
            newNFTs.push(<NFT src={src} setChooseArr={setChooseArr} chooseArr={chooseArr}/>);
        })
        setNFTs(newNFTs);
    }, []);

    return <Center>
        <Grid mt="48px" templateColumns={size.width < 660 ? 'repeat(1, 1fr)' :size.width < 978 ? 'repeat(2, 1fr)' : size.width < 1296 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'}
              columnGap="24px" rowGap="24px">
            {NFTs}
        </Grid>
    </Center>
}