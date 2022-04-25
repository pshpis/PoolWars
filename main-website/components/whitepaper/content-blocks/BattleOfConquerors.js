import {Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";

export const BattleOfConquerors = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Battle of the Conquerors</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">“Pool Wars” team released an exclusive Play-to-Earn game special for our community. By playing “Battle of the Conquerors“ you will get a governance token.</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">This is a <b>multiplayer</b> game in which you need to capture the most territories. The player who captures the most territories and defeats everyone will be declared the winner. Also, you can play in a team with your friends, create clans and much more.</Text>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">Each warlord has three main characteristics:</Text>
        <UnorderedList padding="16px 16px" fontSize="16px" lineHeight="24px"><b>
            <ListItem padding="0px 0px 4px">Attack</ListItem>
            <ListItem padding="0px 0px 4px">Defense</ListItem>
            <ListItem padding="0px 0px 4px">Intellect</ListItem>
        </b></UnorderedList>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">Moreover, each warlord has unique skills. Use it to defeat the rest!</Text>
        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">The “Battle of the Conquerors” has a <b>ladder</b>, according to the results of which, at the end of the first month after the release of the game a <b>Prize Pool of 300,000$</b> will be drawn between the best players</Text>
    </>
}