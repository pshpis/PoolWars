import {Box} from "@chakra-ui/react";

export const Welcome = () => {
    return <Box>
        <Box fontFamily="Trap" fontWeight="900" fontSize="60px" w="650px" lineHeight="64px" mb={13}>
            Welcome to the <Box fontSize="80px" as='span' color="#7951F5" lineHeight="82px">#Warlord&#39;s&nbsp;</Box>
            <Box as='span' fontSize="86px" color="#C4F57C" lineHeight="82px">P2E</Box>
            <Box as='span' fontSize="80px" lineHeight="82px">Metaverse</Box>
        </Box>
        <Box fontFamily="Onest" fontWeight="300" fontSize="20px" w="630px">
            <Box mb={4}>
                We are creating a unique NFT portrait collection of the most powerful warlords <Box as="span" color="#B8C3E6" fontWeight={500}>in history</Box>. Our community will have access
                <br/>to the “Battle of the Conquerors” game with a prize pool of <Box as="span" color="#B8C3E6" fontWeight={500}>$100,000</Box>. To participate, you should mint at least one of
                <br/><Box as="span" color="#B8C3E6" fontWeight={500}>50,000 Warlords NFT.</Box>
            </Box>
            <Box mb={4}>
                To have advantage over the rest players you can upgrade <br/>your warlord by special NFT cards. Each card can improve one <br/>of three parameters such as attack, defense and intellect. Moreover, cards will give access to
                <Box as="span" borderRadius="14px" backgroundColor="#C4F57C" w="151px" color="black" padding="6px 10px 3px" ml={3}
                     fontWeight={900} fontFamily="Trap" fontSize="20px" letterSpacing="0.12em">
                    POOL<Box as="span" fontWeight={600}>WARS</Box>
                </Box>
            </Box>
            <Box>At stage 0 you can participate in Airdrop of these cards.</Box>
        </Box>
    </Box>
}