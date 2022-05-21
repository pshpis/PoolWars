import {Box} from "@chakra-ui/react";
import {useWindowSize} from "../../hooks/useWindowSize";

export const Welcome = () => {
    const size = useWindowSize();
    let welcomeTextSize = 60;
    if (size.width < 500) welcomeTextSize = 40;
    return <Box width={size.width > 1100 ? "50%" : "100%"} mb={size.width>1100? "0" : "20px"}>
        <Box fontFamily="Trap" fontWeight="900" fontSize={welcomeTextSize+"px"}  lineHeight="64px" mb={13}>
            Welcome to the <Box fontSize={welcomeTextSize*1.33 + "px"} as='span' color="#7951F5" lineHeight={welcomeTextSize*1.33 + 2 + "px"}>#Warlord&#39;s&nbsp;</Box>
            <Box as='span' fontSize={welcomeTextSize*1.43 + "px"} color="#C4F57C" lineHeight={welcomeTextSize*1.43 + 2 + "px"} whiteSpace="nowrap">P2E&nbsp;</Box>
            <Box as='span' fontSize={welcomeTextSize*1.33 + "px"} lineHeight={welcomeTextSize*1.33 + 2 + "px"} whiteSpace="nowrap">Metaverse</Box>
        </Box>
        <Box fontFamily="Onest" fontWeight="300" fontSize="20px">
            <Box mb={4}>
                We are creating a unique NFT portrait collection of the most powerful warlords <Box as="span" color="#B8C3E6" fontWeight={500}>in history</Box>. Our community will have access
                to the “Battle of the Conquerors” game with a prize pool of <Box as="span" color="#B8C3E6" fontWeight={500}>$100,000</Box>. To participate, you should mint at least one of
                <Box as="span" color="#B8C3E6" fontWeight={500} whiteSpace="nowrap">&nbsp;50,000 Warlords NFT.</Box>
            </Box>
            <Box mb={4}>
                To have advantage over the rest players you can upgrade your warlord by special NFT cards. Each card can improve one of three parameters such as attack, defense and intellect. Moreover, cards will give access to
                <Box as="span" borderRadius="14px" backgroundColor="#C4F57C" w="151px" color="black" padding="6px 10px 3px" ml={3}
                     fontWeight={900} fontFamily="Trap" fontSize="20px" letterSpacing="0.12em">
                    POOL<Box as="span" fontWeight={600}>WARS</Box>
                </Box>
            </Box>
            <Box>At stage 0 you can participate in Airdrop of these cards.</Box>
        </Box>
    </Box>
}