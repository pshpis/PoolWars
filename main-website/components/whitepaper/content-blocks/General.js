import {Heading, Text} from "@chakra-ui/react";

export const General = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">General</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">General information about Pool Wars project</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text fontWeight="700" fontSize="16px">
            We are creating a unique collection of the most powerful and strongest nordic warriors in history.
            The project has a detailed lore, beautiful hand-made art and professional team behind it.
        </Text>
        <hr style={{marginTop: "20px", marginBottom: "20px"}}/>

        <Text fontSize="16px">
            Our community will gain access to <b>Free Mint</b> of Combat Cards, <b>NFT Swaps</b>, <b>Staking</b>,
            <b>Katts Upgrading System</b> and <b>detailed Tokenomics</b>. But the main utility and focus of our project
            is <b>Pool Wars Event</b>.
        </Text>

    </>
}
