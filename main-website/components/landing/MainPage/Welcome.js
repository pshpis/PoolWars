import {Box, Text} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const Welcome = () => {
    const size = useWindowSize();
    return <Box width={size.width > 1100 ? "100%" : "100%"} mb={size.width>1100? "0" : "20px"}>
        <Box fontWeight="400" fontFamily="Njord" color="#E8E3DD" mb="40px">
            <Text fontSize="48px" lineHeight="48px">welcome to the</Text>
            <Text fontSize="88px" lineHeight="88px" color="#71CFC3">Elder Katts</Text>
        </Box>

        <Box whiteSpace="16px" lineHeight="30px" paragraph="16px" fontStyle="Light" fontWeight="300" fontSize="20px">
            <Text mb="16px">We are creating a unique collection of the most powerful and strong Nordic Warriors in history.
                  Our community will get access to FREE MINT of Combat Cards, &quot;Pool Wars Events&quot; v0 and v1, NFT Swaps and
            much much more.  Get ready for an exciting immersive experience and have fun Degen!</Text>
            <Text mb="16px">In order to have an advantage over other brave warriors, you can improve the abilities of
                your Katt with special Combat Cards. Each card can improve one of three parameters, such as attack, defense,
                or intelligence. Upgrades will allow you to earn more $KATT Tokens. What&apos;s more exciting, Combat Cards will
                give you early access to &quot;Pool Wars Events&quot; v0, right after the mint!</Text>
            Scroll down to see everything we have planned for you, neatly organized in our in-depth and extended roadmap!
        </Box>
    </Box>
}
