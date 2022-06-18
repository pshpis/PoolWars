import {Heading, ListItem, OrderedList, Text} from "@chakra-ui/react";

export const PoolWars = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Pool Wars</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about exclusive mode “Pool Wars”</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Pool Wars Event v0</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">At the <b>0 stage</b> Pool Wars event will be a battle of the nft. So you can put some of your warlords cards in one of two pools for a period of <b>three days</b>. After the deadline pools with more increasing points will win.</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">So all cards from the losers pool will be <b>burned</b>, and each winner will take new cards with the number of points equal to the number of points in both pools multiplied by the share in the winning pool, and rounded down.</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">That’s a great opportunity for our users to increase the amount of their cards. Also, you can invite your friends to win with more chances.</Text>
        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>


        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Pool Wars Event v1</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">Each “Pool Wars event” is a <b>battle of liquidity</b>. There will be two pools where community members can provide liquidity in our tokens. Also, each event has a weekly duration. After the deadline pool with more liquidity will be the winner and accumulate all liquidity from the two pools. So participants of the winner pool will take profit in shares equal to their proportions in the pool before the deadline.</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">To participate in <b>”Pool Wars”</b> you have to be a member of our community. You have <b>two</b> options to do it:</Text>
        <OrderedList padding="16px 0px" fontSize="16px" lineHeight="24px">
            <ListItem><b>Own Warlord’s Card NFT</b>. This will  give a default opportunity to provide liquidity in the pools.</ListItem>
            <ListItem><b>Own Warlord NFT</b>. This will give an opportunity to <b>participate at first and last hours</b> of each <b>“Pool War”</b> event. Moreover, Warlord’s owners can be members of exclusive “Pool Wars” and <b>take 30% of all commissions</b> into Warlord’s Metaverse.
            </ListItem>
        </OrderedList>
    </>
}