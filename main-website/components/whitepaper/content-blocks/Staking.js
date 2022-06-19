import {Heading, Text} from "@chakra-ui/react";

export const Staking = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Staking</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about staking and our token</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">The “Pool Wars” project includes such a <b>DeFi</b> tool as <b>staking</b>. The user will have the opportunity to put his warlord at stake and receive daily interest from this in our token.
        </Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">Also, our token can be used in the <b>“Pool Wars Event”</b>, for purchasing <b>legendary Warlords card NFTs</b> and to buy <b>raffle tickets</b>.</Text>
    </>
}
