import {Heading, ListItem, OrderedList, Text} from "@chakra-ui/react";

export const PoolWars = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Pool Wars</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about exclusive mode “Pool Wars”</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px"><b>Each “Pool War” event is a battle for liquidity. There will be two pools where community members can provide liquidity. Also, each event has a weekly duration. After the deadline, the pool with more liquidity will be the winner and accumulate all the liquidity from the two pools. So participants in the winner pool will take profit in shares equal to their proportions in the pool before the deadline.</b></Text>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">To participate you either have to:</Text>
        <OrderedList padding="16px 0px" fontSize="16px" lineHeight="24px">
            <ListItem><b>Own Warlord’s Card NFT</b>. This will give a default opportunity to provide liquidity in the pools.</ListItem>
            <ListItem><b>Own Warlord NFT</b>. This will give an opportunity to <b>participate at the first and last hours</b> of each <b>“Pool War”</b> event. Moreover, Warlord’s owners can be members of exclusive “Pool Wars” and <b>take 30% of all commissions</b> into Warlord’s Metaverse.
            </ListItem>
        </OrderedList>
    </>
}