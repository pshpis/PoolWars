import {Box} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import Link from "next/link";

export const Welcome = () => {
    const size = useWindowSize();
    let welcomeTextSize = 60;
    if (size.width < 500) welcomeTextSize = 40;
    return <Box width={size.width > 1100 ? "50%" : "100%"} mb={size.width>1100? "0" : "20px"}>
        <Box fontFamily="Trap" fontWeight="900" fontSize={welcomeTextSize+"px"}  lineHeight="64px" mb={13}>
            Welcome to the <Box fontSize={welcomeTextSize*1.33 + "px"} as='span' color="#7951F5" lineHeight={welcomeTextSize*1.33 + 2 + "px"}>#Warlords&nbsp;</Box>
            <Box as='span' fontSize={welcomeTextSize*1.43 + "px"} color="#C4F57C" lineHeight={welcomeTextSize*1.43 + 2 + "px"} whiteSpace="nowrap">NFT</Box>
        </Box>
        <Box fontFamily="Onest" fontWeight="300" fontSize="20px">
            <Box mb={4}>
                We are creating a unique NFT portrait collection of the most powerful warlords <Box as="span" color="#B8C3E6" fontWeight={500}>in history</Box>. Our community will have access
                to the “Pool Wars Events” v0 and v1, staking and ruffles. To participate, you should mint at least one of
                <Box as="span" color="#B8C3E6" fontWeight={500} whiteSpace="nowrap">&nbsp;10,000 Warlords.</Box>
            </Box>
            <Box mb={4}>
                To have advantage over other warriors you can upgrade your warlord by using special NFT cards. Each card can improve one of three parameters such as attack, defense and intellect and allows you to earn more on warlord staking. Moreover, cards will give access to
                <Link href="/pool-wars-v0"><Box as="span" borderRadius="14px" backgroundColor="#C4F57C" w="151px" color="black" padding="6px 10px 3px" ml={3}
                     fontWeight={900} fontFamily="Trap" fontSize="20px" letterSpacing="0.12em" cursor="pointer">
                    POOL<Box as="span" fontWeight={600}>WARS</Box>&nbsp;V0
                </Box></Link>
            </Box>
            <Box>At stage 0 you can participate in the Airdrop of these cards.</Box>
        </Box>
    </Box>
}
