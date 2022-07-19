import {useWindowSize} from "../../../hooks/useWindowSize";
import {
    Box,
    BoxProps,
    Divider,
    Flex,
    HStack,
    StackProps,
    Text,
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState, ReactNode} from "react";

type RoadmapStageProps  = {
    title: string,
    children?: ReactNode
} & StackProps;

const RoadmapStageTitle = ({title, location}) => {
    const size = useWindowSize();
    const stageBallRadius = 12;
    const defaultPadding = 96;
    const spacing = 38;
    const stageTitleRef = useRef(null);
    const [stageTitleWidth, setStageTitleWidth] = useState(0);
    useEffect(() => {
        setStageTitleWidth(stageTitleRef.current.offsetWidth);
    }, [stageTitleRef.current]);
    const stageLeftTitlePadding = size.width / 2 - defaultPadding - stageTitleWidth;
    const stageRightTitlePadding = size.width / 2 - spacing;
    if (location)
        return <HStack pl={stageRightTitlePadding+"px"} justifyContent="space-after" direction="row" spacing={spacing+"px"}>
            <Box background="#B2B2B2" w="24px" h="24px" borderRadius={stageBallRadius+"px"}/>
            <Box ref={stageTitleRef} color="#71CFC3" fontWeight="900" fontSize="32px" lineHeight="48px">{title}</Box>
        </HStack>
    else return <HStack pl={stageLeftTitlePadding+"px"} justifyContent="space-after" direction="row" spacing={spacing+"px"}>
        <Box ref={stageTitleRef} color="#71CFC3" fontWeight="600" fontSize="32px" lineHeight="48px">{title}</Box>
        <Box background="#B2B2B2" w="24px" h="24px" borderRadius={stageBallRadius+"px"}/>
    </HStack>
}

export const Roadmap = (props: BoxProps) => {
    const size = useWindowSize();

    const borderWidth = size.width/2;
    const defaultPadding = 96;
    return <Box pl="96px" pr="96px" {...props}>
        <Divider mb="80px" borderColor="#E8E8E826" border="0.5px"/>
        <Text fontFamily="Njord" fontWeight="400" fontSize="64px" lineHeight="52px">Roadmap</Text>

        <Box>
            <Flex>
                <Divider ml={borderWidth} width={borderWidth} borderColor="#E8E8E880" border="2px"/>
                <Divider ml={borderWidth-50+"px"} position="absolute" width={defaultPadding/2+"px"} height={defaultPadding/2+"px"} borderColor="#E8E8E880"
                         borderRight="2px" borderBottom="2px" borderRadius="0 0 100px 0" transform="rotate(180deg)"/>
                <Divider position="absolute" width={borderWidth} borderColor="#E8E8E880" border="2px"
                         transform="rotate(90deg)"/>

            </Flex>

            <RoadmapStageTitle title="Stage 0" location={true}/>
            <RoadmapStageTitle title="Stage 1" location={false}/>
            <RoadmapStageTitle title="Stage 2" location={true}/>
            <RoadmapStageTitle title="Stage 3" location={false}/>

        </Box>
    </Box>
}