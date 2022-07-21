import {Heading, Text} from "@chakra-ui/react";

export const CombatCards = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Combat cards and Swaps</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about Combat cards and NFT Swaps</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Combat Cards</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            At <b>stage 0</b> we will launch the <b>Combat Cards collection</b>. It will be completely free for members verified by our bot. They will be able to take one card <b>every day</b>. The main goal of these cards is to upgrade Katts’ levels to increase staking rewards.
        </Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            From the airdrop you can get one of nine cards. Each card can improve one of three Katt’s parameters such as attack, defense and intellect while each parameter has <b>3</b> types of <b>rarities</b>: <b>common</b>, <b>epic</b> and <b>rare</b>. Epic cards will improve one of Katt’s parameters by 6 points, rare - by 3 points and common - by 1 point.
        </Text>
        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>


        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Swaps</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            Swaps are DeFi application which will allow you to exchange cards with a total of 12 points for legendary card which will increase your Katt’s parameter on 15 points.
        </Text>
    </>
}
