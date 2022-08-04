import {Heading, ListItem, OrderedList, Text} from "@chakra-ui/react";

export const PoolWars = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Pool Wars</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">
            Pool Wars is essentially a betting game, in which it will be possible to bet with native token, obtained from staking Katts. If a tribe secures the victory, the players who bet on the winners will receive a token pool of players who bet on the losing tribe, thereby increasing the number of their tokens.
        </Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Pool Wars Event v0. Combat Cards Utility.</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            At the <b>0 stage</b> Pool Wars our members will bet their <b>Combat Cards NFTs</b>. You will be able to put some of your Combat Cards in <b>Defense Pool</b> or <b>Attack Pool</b> for some period of time.
        </Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            When the holders put cards into the pool, the chance of the victory of this pool will increase, but will not guarantee the victory. After the winner pool is randomly selected, the winning team will receive a pool of player cards from the losing team.
        </Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            That’s a great opportunity for our users to increase the amount of their cards. Also, you can invite your friends to win with more chances.
        </Text>
        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>


        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Pool Wars Event v1. $KATT Utility</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            The main difference between pool wars v0 and pool wars v1 is the ability to bid with the native token <b>$KATT</b>, which will be used instead of combat cards and will have more further utility. To be able to participate in Pool Wars V1 you will have to own at least one Katt.
        </Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">To participate in <b>”Pool Wars”</b> you have to be a member of our community. You have <b>two</b> options to do it:</Text>
        <OrderedList padding="16px 0px" fontSize="16px" lineHeight="24px">
            <ListItem><b>Own Warlord’s Card NFT</b>. This will  give a default opportunity to provide liquidity in the pools.</ListItem>
            <ListItem><b>Own Warlord NFT</b>. This will give an opportunity to <b>participate at first and last hours</b> of each <b>“Pool War”</b> event. Moreover, Warlord’s owners can be members of exclusive “Pool Wars” and <b>take 30% of all commissions</b> into Warlord’s Metaverse.
            </ListItem>
        </OrderedList>
    </>
}