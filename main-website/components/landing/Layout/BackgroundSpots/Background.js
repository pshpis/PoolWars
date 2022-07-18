import {Box} from "@chakra-ui/react";

export const Background = ({top}) => {
    return <Box zIndex={-100} css={{
        position: "absolute",
        width: "100vw",
        height: "2568px",
        left: "0px",
        top: top,
        background: "#202020",
    }}/>;
}