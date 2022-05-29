import {Heading, Text} from "@chakra-ui/react";

export const Roadmap = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Roadmap</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Here you can see the biggest &quot;Pool Wars&quot; updates</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 0</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="40px">Airdrop</Text>
        <Text padding="8px 0px" fontWeight="400" fontSize="16px" lineHeight="24px">Creating unique <b>Warlords Card NFT</b> and launching an <b>airdrop of 10,000 cards</b>.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 1</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Launching Warlords NFT Collection</Text>
        <Text padding="8px 0px">Launching <b>Warlords NFT Collection</b> and <b>airdrop 500 Warlords NFTs</b> for the first members of our community. At this stage our collection will also be presented at the <b>biggest marketplaces</b>, including <b>OpenSea</b>.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 2</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Launching “Pool Wars“</Text>
        <Text padding="8px 0px">Launching <b>“Pool Wars”</b>. <b>Warlords NFT</b> owners will receive <b>30%</b> of all commissions in our <b>Metaverse</b>. Invite your friends and win together.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 3</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Launching the “Battle of the Conquerors”</Text>
        <Text padding="8px 0px">It will use <b><i>GameFi</i></b> and the <b><i>Play-to-Earn</i></b> concept and will give you an opportunity to use the uniqueness of each warlord. Using special traits of your <b>Warlord</b> and increasing your <b>NFTs</b>, you will be able to win a <b>$100,000 Prize Pool</b>.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 4</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Launching a token on Polygon Mainnet</Text>
        <Text padding="8px 0px">Launching our token on <b><i>Dex</i></b> and <b><i>Cex</i></b>. You will be need to purchase warlords in the future and make purchases in our Metaverse. All commissions will be taken by using our token. Every week we will burn a part of our income to create a <b>deflation model</b>.</Text>

    </>
}
