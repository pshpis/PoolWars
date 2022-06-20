import {Box, Center, Grid, HStack, Img, Input, NumberInput, SimpleGrid, VStack} from "@chakra-ui/react";
import {PoolWarsBox} from "../Layout/PoolWarsBox";

const NftCard = ({url, points}) => {
    return <VStack width="320px" as={PoolWarsBox} borderRadius="20px" fontSize="24px">
        <Img src={url} width="320px" height="448px">

        </Img>
        <Grid templateColumns="1fr 50px" height="100px">
            <Box>You have: </Box>
            <Box ml={"5px"} textAlign="center"> 5 </Box>
            <Box>You choose: </Box>
            <NumberInput width={"50px"} ml={"5px"} fontSize="24px"/>
        </Grid>
    </VStack>
}

export const NftSwapsChoose = () => {
    return <SimpleGrid minChildWidth="350px">
        <Center>
            <NftCard url="increaseNft/1.png" points={1}/>
        </Center>
    </SimpleGrid>
}