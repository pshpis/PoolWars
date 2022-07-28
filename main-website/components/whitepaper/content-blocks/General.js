import {Heading, Text} from "@chakra-ui/react";
import Link from "next/link";
export const General = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">General</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">General information about the Elder Katts project</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text fontWeight="700" fontSize="16px">
            We are creating a unique NFT portrait collection of the most powerful and strongest nordic warriors in history. The project has a detailed lore, beautiful hand-made arts and professional team.
        </Text>
        <hr style={{marginTop: "20px", marginBottom: "20px"}}/>

        <Text fontSize="16px">
            Our community will gain access to the <b>Combat Cards Free Mint</b>, <b>NFT swaps</b>, <b>staking</b>, <b>raffles</b> and <b>1/1 Auctions</b>. But the main utility of our project is <b>Pool Wars Event</b>.
        </Text>

    </>
}
