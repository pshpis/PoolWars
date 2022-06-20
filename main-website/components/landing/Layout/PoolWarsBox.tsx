import {Box, BoxProps} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const PoolWarsBox = (props: BoxProps) => {
    const size = useWindowSize();
    return <Box backgroundColor="rgba(232, 227, 221, 0.09)" backdropFilter="blur(29.788px)" borderRadius={size.width >= 500? 60: 40}
                boxShadow="inset 4.51333px -4.51333px 4.51333px rgba(195, 191, 186, 0.464), inset -4.51333px 4.51333px 4.51333px rgba(255, 255, 255, 0.464)"
            {...props}
    >{props.children}</Box>
}