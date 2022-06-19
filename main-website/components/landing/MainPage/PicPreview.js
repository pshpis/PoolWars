import {Box, Flex, Img} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const PicPreview = () => {
    const [marginLeft, setMarginLeft] = useState(0);
    const size = useWindowSize();
    const delta = 28;
    const imgWidth = 320;
    const imgHeight = 448;
    const imgCount = 9;

    let intervalId;
    useEffect(() => {
       intervalId = setInterval(() => {
           setMarginLeft(marginLeft - imgWidth - delta);
           console.log(marginLeft);
       }, 3000);
       return () => clearInterval(intervalId);
    });
    useEffect(() => {
        let blockWidth = (imgWidth + delta) * imgCount;
        let maxMarginLeft = blockWidth - size.width;
        if (-marginLeft >= maxMarginLeft) clearInterval(intervalId);
    }, [intervalId, marginLeft, size.width])

    return <Box overflowY="hidden" overflowX="auto" whiteSpace="nowrap" >
        <Flex w="100%" mt="100px" maxW="100%"
                 flexWrap="nowrap" justifyContent="spaceBetween"  mb="100px"
                 transform={"translateX("+marginLeft+"px)"} transition="all 1s"
                 css={{'&::-webkit-scrollbar': {
                         width: '0',
                     },}}>

            <Img src="/increaseNft/1.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>


            <Img src="/increaseNft/2.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>
            <Img src="/increaseNft/3.png"width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>
            <Img src="/increaseNft/4.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>
            <Img src="/increaseNft/5.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>
            <Img src="/increaseNft/6.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>

            <Img src="/increaseNft/7.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>
            <Img src="/increaseNft/8.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>
            <Img src="/increaseNft/9.png" width={imgWidth + "px"} height={imgHeight + "px"} mr={delta+"px"}
                 flex={"0 0 " + imgWidth + "px"}/>

        </Flex>
    </Box>


}