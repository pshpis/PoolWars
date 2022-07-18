import {Box} from "@chakra-ui/react";

export const FirstSpot = ({top, width}) => {
    return <Box zIndex={-100} css={{
        position: "absolute",
        width: width,
        height: "353px",
        left: "0px",
        top: top,
        background: "#2B504B",
        filter: "blur(295px)"
    }}/>;
}