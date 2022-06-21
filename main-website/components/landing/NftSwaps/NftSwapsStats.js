import {Box, Button, Center, Grid, Heading, SimpleGrid, Spacer, Stack, Text, VStack} from "@chakra-ui/react";
import {PoolWarsBox} from "../Layout/PoolWarsBox";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const NftSwapsStats = ({totalPoints, chooseRef}) => {
    const needPointsPerSwap = 12;
    const size = useWindowSize();

    const onClick = () => {
        if (totalPoints === 0){
            window.scrollTo(0, chooseRef.current.offsetTop - 97);
        }
    }

    return <Stack direction="column" minHeight="448px" borderRadius="30px" margin={size.width > 400 ? "0 20px" : "0 5px"}
                  spacing={0} padding="20px" fontSize="20px" as={PoolWarsBox}>

            <Heading mb="5px" textAlign="center" fontFamily="Trap" fontSize="48px" color="#7951F5">Nft Swaps Live!</Heading>
            <Text textAlign="center" >
                Here you can swap your regular warlords cards to take a
                <Box as="span" color="#C4F57C">&nbsp;Legendary one</Box>.
                Now you should choose some of your nfts to burn 12 increase points
            </Text>


            <Spacer/>
            <Center as={VStack}>
                <Grid templateColumns="1fr 40px" borderRadius="20px" padding="15px" columnGap="40px" >
                    <Text>Selected points: </Text>
                    <Text pl="10px"> {totalPoints} </Text>
                    <Text>Need points per one: </Text>
                    <Text pl="10px"> {needPointsPerSwap} </Text>
                    <Text>You will take:</Text>
                    <Text pl="10px"> {Math.floor(totalPoints / needPointsPerSwap)} </Text>
                </Grid>

            </Center>
            <Center>
                <Button backgroundColor="#7951F5" width="220px" borderRadius="20px"
                        fontSize="30px" height="50px"
                        _hover={{backgroundColor: "#5331cb"}}
                        onClick={onClick}>Swap!</Button>
            </Center>

    </Stack>
}