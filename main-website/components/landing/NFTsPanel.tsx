import {useWindowSize} from "../../hooks/useWindowSize";
import React, {useEffect, useMemo, useState} from "react";
import {Box, Center, Grid, GridItem, HStack, Img, Input, Text, useToast} from "@chakra-ui/react";

const TitleText = () => {
    const size = useWindowSize();
    const defaultTitleSize = useMemo(() => {
        if (size.width < 531) return 32;
        if (size.width < 646) return 48;
        return 64;
    }, [size.width]);

    return <HStack mt="80px" fontWeight="400" fontSize={defaultTitleSize + "px"} lineHeight="74px" spacing={0}
                   w="100%" maxW="1248px" margin="0 auto">
        <Text fontFamily="Njord">CH</Text>
        <Text fontFamily="Njord Alternate">OO</Text>
        <Text fontFamily="Njord">SE NFTS</Text>
    </HStack>
}

const NFT = ({src, maxValue, setChooseArr}) => {
    const toast = useToast();
    const NFTsName = src.slice(37).slice(0, -4);

    return <GridItem>
        <Box width="294px" height="398px">
            <Img width="294px" height="294px" borderTopRadius="24px"
                 src={src}/>
            <Box pt="11px" pl="24px" pb="16px" pr="24px" width="294px" height="104px" borderBottomRadius="24px"
                 fontWeight="600" fontSize="24px" lineHeight="36px" backgroundColor="#E8E8E8">

                <HStack spacing="auto">
                    <Text w="150px" color="#949494">You choose:</Text>
                    <Input p="0" mr="auto" w="30px" type="text"
                           placeholder="0" fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3"
                           textAlign="right" border="0px" _placeholder={{color: 'inherit'}}
                        onChange={ (evt) => {
                           // @ts-ignore
                           const nftChosen = +evt.target.value;
                           if ((((nftChosen ^ 0) !== nftChosen) || nftChosen < 0) && !toast.isActive("naturalCheck")) {
                               toast.close("moreCheck");
                               toast({
                                   id: "naturalCheck",
                                   title: 'Impossible to choose negative or not integer number of NFTs',
                                   status: 'info',
                                   position: 'top',
                                   isClosable: true,
                               });
                           } else if (nftChosen > maxValue && !toast.isActive("moreCheck")) {
                               toast.close("naturalCheck");
                               toast({
                                   id: "moreCheck",
                                   title: 'It is impossible to take more NFTs than you have',
                                   status: 'warning',
                                   position: 'top',
                                   isClosable: true,
                               });
                           }
                           else setChooseArr(NFTsName, nftChosen);}
                        }/>
                </HStack>
                <HStack spacing="auto">
                    <Text color="#949494">You have:</Text>
                    <Text color="#71CFC3">{maxValue}</Text>
                </HStack>
            </Box>
        </Box>
    </GridItem>
}

export const NFTSPanel = ({NFTsStats, setChooseArr}) => {
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
        <TitleText/>
        <Center>
            <Grid mt="48px" templateColumns={size.width < 804 ? 'repeat(1, 1fr)' :size.width < 1112 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                  columnGap="24px" rowGap="24px">
                {NFTs}
            </Grid>
        </Center>
    </Box>
}