import {Heading, Text} from "@chakra-ui/react";

export const Roadmap = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Roadmap</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Here you can see the biggest &quot;Pool Wars&quot; updates</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 0</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="40px">Airdrop of Warlords Card NFT collection</Text>
        <Text padding="8px 0px" fontWeight="400" fontSize="16px" lineHeight="24px">Launch <b>Nft Swaps</b> and <b>Pool Wars Events V0</b>. Also, there will be collaborations with other collections and ruffles for whitelist. At this step we are creating a strong community.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 1</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Mint Warlords Collection</Text>
        <Text padding="8px 0px">First hours of mint time will be the time for whitelisted members, after this everyone will get a chance to mint warlords.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 2</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Launch Pool Wars Events V1, staking warlords nft and improving warlord system</Text>
        <Text padding="8px 0px">Also, there will be a weekly ruffle for Warlord’s owners for part of royalty.</Text>

        <hr style={{marginTop: "24px", padding: "16px 0px 0px"}}/>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="32px" lineHeight="40px">Stage 3</Text>
        <Text padding="24px 0px 8px" fontWeight="700" fontSize="24px" lineHeight="36px">Launch a DAO</Text>
        <Text padding="8px 0px">By DAO we will make next decisions and realize the coolest ideas of our community.</Text>

    </>
}
