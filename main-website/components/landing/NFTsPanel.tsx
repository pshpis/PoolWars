import {useWindowSize} from "../../hooks/useWindowSize";
import React, {useEffect, useState} from "react";
import {Box, Center, Grid, GridItem, HStack, Img, Input, Text, useToast} from "@chakra-ui/react";

const NFT = ({src, maxValue, setChooseArr}) => {
    const toast = useToast();

    const NFTsName = src.slice(37).slice(0, -4);

    // useEffect(() => {
    //     console.log(src)
    // }, [size.width]);

    return <GridItem>
        <Box width="294px" height="398px">
            <Img width="294px" height="294px" borderTopRadius="24px"
                 src={src}/>
            <Box pt="11px" pl="24px" pb="16px" pr="24px" width="294px" height="104px" borderBottomRadius="24px"
                 fontWeight="600" fontSize="24px" lineHeight="36px" backgroundColor="#E8E8E8">
                <HStack spacing="auto">
                    <Text color="#949494">You have:</Text>
                    <Text color="#71CFC3">{maxValue}</Text>
                </HStack>
                <HStack spacing="auto">
                    <Text w="150px" color="#949494">You choose:</Text>
                    <Input p="0" mr="auto" w="30px" type="text"
                           placeholder="0" fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3"
                           textAlign="right" border="0px" _placeholder={{color: 'inherit'}}
                        onChange={ (evt) => {
                           // @ts-ignore
                           const nftChosen = +evt.target.value;
                           if ((nftChosen ^ 0) !== nftChosen) {
                               toast({
                                   title: 'This is not an integer number of NFTs',
                                   status: 'error',
                                   position: 'top',
                                   isClosable: true,
                               });
                           } else if (nftChosen < 0) {
                               toast({
                                   title: 'Impossible to choose negative number of NFTs',
                                   status: 'error',
                                   position: 'top',
                                   isClosable: true,
                               });
                           } else if (nftChosen > maxValue) {
                               toast({
                                   title: 'It is impossible to take more NFTs than you have',
                                   status: 'error',
                                   position: 'top',
                                   isClosable: true,
                               });
                           }
                           else setChooseArr(NFTsName, nftChosen);}
                        }/>
                </HStack>
            </Box>
        </Box>
    </GridItem>
}

export const NFTSPanel = ({NFTsStats, setChooseArr}) => {
    const size = useWindowSize();

    const [NFTs, setNFTs] = useState([]);
    useEffect(() => {
        let newNFTs = [...NFTs];
        NFTsStats.forEach((item) => {
            if (item.maxValue !== 0)
                newNFTs.push(<NFT src={item.src} setChooseArr={setChooseArr} maxValue={item.maxValue}/>);
        })
        setNFTs(newNFTs);
    }, [NFTsStats]);

    return <Center>
        <Grid mt="48px" templateColumns={size.width < 804 ? 'repeat(1, 1fr)' :size.width < 1112 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
              columnGap="24px" rowGap="24px">
            {NFTs}
        </Grid>
    </Center>
}