import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";
import {Header} from "../Layout/Header/Header";
import {Box, Button, Center, Grid, Heading, Icon, Spacer, Stack, Text} from "@chakra-ui/react";
import {TimerDown} from "./TimerDown";
import {GiCheckedShield, GiCrossedSwords} from "react-icons/gi";
import {useRef} from "react";
import {WarlordsCardsChoose} from "../NftSwaps/WarlordsCardsChoose";
import {useWarlordsCardsChoose} from "../../../hooks/useWarlordsCardsChoose";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {Footer} from "../Layout/Footer/Footer";
import {PoolWarsDivider} from "../Layout/PoolWarsDivider";

export const EventsV0 = () => {
    let needDate = new Date(Date.now());
    needDate.setDate(1);
    needDate.setHours(0);
    needDate.setMinutes(0);
    needDate.setSeconds(0);
    needDate.setMonth(needDate.getMonth() + 1);

    const [chooseArr, setChooseArr, getSumPoints] = useWarlordsCardsChoose();

    const chooseRef = useRef(null);

    const provideOnClick = (poolId) => {
        return () => {
            // handle onclick with poolId
            if (getSumPoints() === 0) {
                window.scrollTo(0, chooseRef.current.offsetTop - 97);
            }
        };
    }

    const size = useWindowSize();

    return <Box paddingTop="77px" fontFamily="Onest">
        <AllSpots/>
        <Header/>
        <Box mt="30px" fontSize="20px" fontFamily="trap">
            <Heading fontSize="48px" textAlign="center" fontFamily="trap">Pool Wars event v0 <Box as="span" color="#7951F5">Live!</Box></Heading>
            <Box mt={"10px"} fontFamily="Onest">
                <Box textAlign="center">
                    This event will be finished in:
                </Box>
                <TimerDown needDate={needDate} textAlign="center"/>
            </Box>
        </Box>

        <Stack direction={size.width >= 768 ? "row" : "column"} width="100%" spacing="5%"
               padding={size.width >= 360 ? "0 5%" : "0"} mt="30px">
            <Box backgroundColor="rgba(196, 245, 124, 0.35)" border="3px solid #C4F57C"
                 borderRadius="30px" width={size.width >= 768? "47.5%" : "100%"} height="380px" padding="10px" backdropFilter="blur(5px)">

                <Stack as={Center} direction="column" height="100%" >
                    <Icon w="100px" h="100px" as={GiCrossedSwords}/>
                    <Heading fontFamily="trap" fontSize="40px">Attack Pool</Heading>

                    <Grid templateColumns="1fr 60px" columnGap="40px" fontSize="18px">
                        <Text>Total points: </Text>
                        <Text pl="10px"> 1287 </Text>
                        <Text>You choose points: </Text>
                        <Text pl="10px"> {getSumPoints()} </Text>
                    </Grid>
                    <Spacer/>
                    <Button backgroundColor="#7951F5" borderRadius="20px" color="#C4F57C"
                            fontSize="30px" height="50px" padding="10px 20px"
                            _hover={{backgroundColor: "#C4F57C", color: "#7951F5"}}
                            onClick={provideOnClick(0)}>
                        Provide your nfts!
                    </Button>
                </Stack>
            </Box>
            <Box backgroundColor="rgba(51, 60, 237, 0.42)" border="3px solid #333CED"
                 borderRadius="30px" width={size.width >= 768? "47.5%" : "100%"}
                 height="380px" padding="10px" backdropFilter="blur(5px)">
                <Stack as={Center} direction="column" height="100%" >
                    <Icon w="100px" h="100px" as={GiCheckedShield}/>
                    <Heading fontFamily="trap" fontSize="40px">Defence Pool</Heading>

                    <Grid templateColumns="1fr 60px" columnGap="40px" fontSize="18px">
                        <Text>Total points: </Text>
                        <Text pl="10px"> 1578 </Text>
                        <Text>You choose points: </Text>
                        <Text pl="10px"> {getSumPoints()} </Text>
                    </Grid>
                    <Spacer/>
                    <Button backgroundColor="#C4F57C" borderRadius="20px" color="#5331cb"
                            fontSize="30px" height="50px" padding="10px 20px"
                            _hover={{backgroundColor: "#5331cb", color: "#C4F57C"}}
                            onClick={provideOnClick(1)}
                    >
                        Provide your nfts!
                    </Button>
                </Stack>
            </Box>
        </Stack>
        <PoolWarsDivider marginTop="60px"/>
        <Box mt="80px" ref={chooseRef}>
            <Heading fontSize="40px" fontFamily="Trap" textAlign="center" mb="20px">Choose nfts</Heading>
            <WarlordsCardsChoose chooseArr={chooseArr} setChooseArr={setChooseArr}/>
        </Box>
        <Footer marginTop="100px"/>
    </Box>
}