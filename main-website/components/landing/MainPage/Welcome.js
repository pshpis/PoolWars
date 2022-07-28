import {Box, Text} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const Welcome = () => {
    const size = useWindowSize();
    let welcomeTextSize = 48;
    if (size.width < 500) welcomeTextSize = 40;
    return <Box width={size.width > 1100 ? "100%" : "100%"} mb={size.width>1100? "0" : "20px"}>
        <Box fontWeight="400" fontFamily="Njord" color="#E8E3DD" mb="40px">
            <Text fontSize="48px" lineHeight="48px">welcome to the</Text>
            <Text fontSize="88px" lineHeight="88px" color="#71CFC3">Elder Katts</Text>
        </Box>

        <Box whiteSpace="16px" lineHeight="30px" paragraph="16px" fontStyle="Light" fontWeight="300" fontSize="20px">
            <Text mb="16px">We are creating a unique NFT portrait collection of the most powerful and strongest nordic warriors
                in history. Our community will gain access to the &quot;Pool Wars Events&quot; v0 and v1, staking and raffles.
                To participate, you should mint or own at least one of Elder Katts.</Text>
            <Text mb="16px">To have advantage over other brave warriors you can upgrade abilities of your Katt by using special
                combat cards. Each card can improve one of three parameters such as attack, defense or intellect. After
                the mint, it will allow you to earn more on Katts staking. Moreover, combat cards will give you early
                access to &quot;Pool Wars Events&quot; v0.</Text>
            At the initial stage you can participate in the Airdrop of the cards.
        </Box>
    </Box>
}
