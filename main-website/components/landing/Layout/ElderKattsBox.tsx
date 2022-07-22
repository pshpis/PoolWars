import {Box, BoxProps} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const ElderKattsBox = (props: BoxProps) => {
    const size = useWindowSize();
    return <Box backgroundColor="#202020"
                borderRadius={size.width >= 500? 40: 30}
                boxShadow="0px 0px 4px 4px #B2B2B226"
                offset="0px 0px"
                {...props}>
        {props.children}
    </Box>
}