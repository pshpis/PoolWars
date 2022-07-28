import {Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";

export const Roadmap = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Roadmap</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Here you can see the biggest &quot;Pool Wars&quot; updates</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 0</Text>
        <UnorderedList padding="24px 0px 8px" fontWeight="500" fontSize="24px" lineHeight="40px">
            <ListItem>Pool Wars v0 and NFT Swaps Developing</ListItem>
            <ListItem>Marketing Campaign</ListItem>
            <ListItem>Connection to Launchpad</ListItem>
            <ListItem>DAO Collaborations</ListItem>
            <ListItem>Partnerships with Builders</ListItem>
            <ListItem>Free Mint of COMBAT CARDS</ListItem>
            <ListItem>Pool Wars v0 and NFT Swaps Launch</ListItem>
        </UnorderedList>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 1</Text>
        <UnorderedList padding="24px 0px 8px" fontWeight="500" fontSize="24px" lineHeight="40px">
            <ListItem>Mint of Elder Katts</ListItem>
            <ListItem>Listing on ME</ListItem>
            <ListItem>Pool Wars v1 Launch</ListItem>
            <ListItem>Provide Unique Gaming Experience</ListItem>
            <ListItem>Releasing Complex Tokenomics</ListItem>
            <ListItem>Katts Upgrading System Development</ListItem>
        </UnorderedList>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 2</Text>
        <UnorderedList padding="24px 0px 8px" fontWeight="500" fontSize="24px" lineHeight="40px">
            <ListItem>Rarity Sensetive Staking</ListItem>
            <ListItem>$KATT Token with LP</ListItem>
            <ListItem>Releasing Katts Upgrades System</ListItem>
            <ListItem>Pool Wars Amplification</ListItem>
            <ListItem>Airdrop for the Holders</ListItem>
        </UnorderedList>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 3</Text>
        <UnorderedList padding="24px 0px 8px" fontWeight="500" fontSize="24px" lineHeight="40px">
            <ListItem>Forming the DAO</ListItem>
            <ListItem>Roadmap 2.0</ListItem>
            <ListItem>Holders only Raffles</ListItem>
            <ListItem>New Utility Development</ListItem>
            <ListItem>Collaborations</ListItem>
            <ListItem>Gen2 Collection Launch</ListItem>
            <ListItem>Mint with $KATT Token</ListItem>
        </UnorderedList>
    </>
}
