import {Box} from "@chakra-ui/react";

export const SecondSpot = ({top}) => {
    return <Box zIndex={-100} css={{
        position: "absolute",
        width: "1440px",
        height: "353px",
        left: "0px",
        top: top,
        background: "#2B504B",
        filter: "blur(295px)"
    }}/>;
}