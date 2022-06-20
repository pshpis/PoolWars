import {Box, Center, Grid, Heading, SimpleGrid, Spacer, Stack, Text} from "@chakra-ui/react";

export const NftSwapsStats = () => {
    return <Stack direction="column" height="448px" spacing={0} padding="0 20px" fontSize="20px">
        <Heading mb="20px" textAlign="center" fontFamily="Trap" fontSize="48px">Nft Swaps Live!</Heading>
        <Text textAlign="center" >Here you can swap your regular warlords cards to take a Legendary one.
            Now you should choose some of your nfts to burn 12 increase points</Text>
        <Spacer/>
        <Center>
            <Grid templateColumns="1fr 30px" spacing={5}>
                <Text>Selected points: </Text>
                <Text pl="10px"> 0 </Text>
                <Text>Need points: </Text>
                <Text pl="10px"> 12 </Text>
            </Grid>
        </Center>


    </Stack>
}