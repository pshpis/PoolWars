import {useWindowSize} from "../../../hooks/useWindowSize";
import {Box, Divider, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {HiSave} from "react-icons/all";

const RoadmapStage = ({title, children}) => {
    return <VStack>

        <Box padding="10px 10px 10px 50px">
            <Box color="#7951F5" padding="0px 0px 10px" fontWeight="700" fontSize="34px" lineHeight="51px">{title}</Box>
            <Box color="#E8E3DD" fontWeight="300" fontSize="20px" lineHeight="30px">{children}</Box>
        </Box>
    </VStack>

}

export const Roadmap = () => {
    const size = useWindowSize();
    const roadmapTitleRef = useRef(null);
    const [mainDividerMarginLeft, setMainDividerMarginLeft] = useState(0);
    useEffect(() => {
         setMainDividerMarginLeft(-roadmapTitleRef.current.offsetWidth*0.4);
    }, [roadmapTitleRef.current]);
    return <Box marginLeft="5vw">
        <Box onClick={() => {console.log(roadmapTitleRef.current.offsetWidth)}}
             marginBottom="1.25vh" fontFamily="Trap" fontWeight="900" fontSize="7.826vh"
                    lineHeight={"7.9vh"}>
            <Flex justifyContent="space-after">
                <Text ref={roadmapTitleRef}>Roadmap</Text>
            </Flex>
        </Box>

        <Divider border="2px color=#D3CDC6" filter="blur(3px)" />

        <Divider marginLeft={roadmapTitleRef.current.offsetWidth/2-size.width*0.475+"px"} transform="rotate(90deg)" border="2px color=#D3CDC6" filter="blur(3px)" />

        <HStack marginLeft="208px" fontFamily="Onest">
            <RoadmapStage title={"Stage 0"}>Airdrop of Warlords Card NFT collection.
                Launch Nft Swaps and Pool Wars Events V0. Also, there will be collaborations with other collections
                and ruffles for whitelist. At this step we are creating a strong community.
            </RoadmapStage>

            <RoadmapStage title={"Stage 1"}>Mint Warlords Collection. First hours of mint
                time will be the time for whitelisted members, after this everyone will get a chance to mint
                warlords.
            </RoadmapStage>

            <RoadmapStage title={"Stage 2"}>Launch Pool Wars Events V1, staking warlords
                nft and improving warlord system. Also, there will be a weekly ruffle for Warlord’s owners for part
                of royalty.
            </RoadmapStage>

            <RoadmapStage title={"Stage 3"}>Launch a DAO. By DAO we will make next decisions
                and realize the coolest ideas of our community.
            </RoadmapStage>
        </HStack>
    </Box>
}