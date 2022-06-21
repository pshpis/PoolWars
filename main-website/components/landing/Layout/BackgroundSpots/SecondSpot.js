import {Box} from "@chakra-ui/react";

export const SecondSpot = ({top}) => {
    return <Box css={{
        position: "absolute",
        width: "1359.45px",
        height: "900.34px",
        left: "43vw",
        top: top,
        background: "rgba(196, 245, 124, 0.35)",
        filter: "blur(482px)"
    }}/>;
}