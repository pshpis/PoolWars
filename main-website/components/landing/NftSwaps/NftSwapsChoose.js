import {
    Box,
    Center,
    Grid,
    HStack,
    Img,
    Input, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField, NumberInputStepper,
    SimpleGrid,
    VStack
} from "@chakra-ui/react";
import {PoolWarsBox} from "../Layout/PoolWarsBox";
import {useEffect, useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";

const NftCard = ({url, points, pointsData, setPointsData, pointsIndex}) => {
    const onChange = (evt) => {
        console.log(evt.target.value);
        let size = Math.min(maxSize, evt.target.value);
        size = Math.max(size, 0);
        let newData = size * points;
        let newPointsData = [...pointsData];
        newPointsData[pointsIndex] = newData;
        setPointsData(newPointsData);
    }

    const maxSize = 5;

    return <VStack width="320px" as={PoolWarsBox} borderRadius="20px" fontSize="24px">
        <Img src={url} width="320px" height="448px"/>
        <Grid templateColumns="1fr 100px" height="110px" pb="10px">
            <Box>You have: </Box>
            <NumberInput ml={"5px"} value={5} isDisabled>
                <NumberInputField fontSize="20px" value={maxSize} />
            </NumberInput>
            <Box>You choose: </Box>
            <NumberInput ml={"5px"} defaultValue={0} min={0} max={5} >
                <NumberInputField fontSize="20px" onChange={onChange}/>
            </NumberInput>
        </Grid>
    </VStack>
}

export const NftSwapsChoose = ({setTotalPoints}) => {
    const cardsValues = [1, 3, 6];
    const [pointsData, setPointsData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    let nftCards = [];
    for (let i = 1; i <= 9; i ++){
        nftCards.push(<Center><NftCard url={"increaseNft/"+i+".png"}
                                       points={cardsValues[(i - 1) % 3]}
                                       pointsData={pointsData}
                                       setPointsData={setPointsData}
                                       pointsIndex={i-1}/></Center>)

    }

    useEffect(() => {
        let sum = 0;
        pointsData.forEach(p => sum += p);
        setTotalPoints(sum);
    }, [pointsData]);

    const size = useWindowSize();
    return <SimpleGrid minChildWidth='320px' spacing="30px" padding={size.width > 400? "0 20px": "0"}>
        {nftCards}
    </SimpleGrid>
}