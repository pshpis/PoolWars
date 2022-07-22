import React, {useEffect, useState} from "react";
import {Box, Flex} from "@chakra-ui/react";

export type CarouselSettings = {
    delta: number, // in px
    elementWidth: number // in px
    elementHeight: number, // in px
    animationDuration: number, // in seconds
    toLeft: boolean,
}

type CarouselProps = {
    settings: CarouselSettings,
    children: JSX.Element[];
}

export const Carousel = ({children, settings} : CarouselProps) => {
    const [marginLeft, setMarginLeft] = useState(settings.toLeft ? 0 : -(settings.elementWidth + settings.delta)*2);
    const [fakeWidth, setFakeWidth] = useState(0);
    const fakeElement = <Box width={fakeWidth + "px"} height={settings.elementHeight + "px"}
                             flex={"0 0 " + fakeWidth + "px"}/>

    const [elements, setElements] = useState(children);

    let intervalId;
    const [count, setCount] = useState(0);

    useEffect(() => {
        intervalId = setInterval(() => {
            if (settings.toLeft) setMarginLeft(marginLeft - settings.elementWidth - settings.delta);
            else setMarginLeft(marginLeft + settings.elementWidth + settings.delta);
            if (count > 0){
                setFakeWidth(fakeWidth + settings.elementWidth + settings.delta);
                let newElements = [...elements];
                if (settings.toLeft) newElements.push(newElements.shift());
                else newElements.unshift(newElements[0]); // bullshit
                setElements(newElements);
            }
            setCount(count + 1);
        }, settings.animationDuration*1000);
        return () => clearInterval(intervalId);
    });

    return <Box overflowY="hidden" overflowX="hidden" whiteSpace="nowrap" css={{'&::-webkit-scrollbar': {
            width: '0',
        },}}>
        <Flex w="100%" maxW="100%"
              flexWrap="nowrap" justifyContent="spaceBetween"
              transform={"translateX("+marginLeft+"px)"} transition={"all " + settings.animationDuration + "s linear"}
              css={{'&::-webkit-scrollbar': {
                      width: '0',
                  },}}>
            {settings.toLeft ? fakeElement : ""}
            {elements}
            {settings.toLeft ? "": fakeElement}
        </Flex>
    </Box>

}