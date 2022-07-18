import {Heading, Text} from "@chakra-ui/react";
import Link from "next/link";
export const General = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">General</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">General information about Pool Wars project</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text fontWeight="700" fontSize="16px">
            We are creating a unique NFT portrait collection of the most powerful and strongest nordic warriors in history. Our community will gain access to the "Pool Wars Events" v0 and v1, staking and raffles. To participate, you should mint or own at least one of Elder Katts.
        </Text>
        <hr style={{marginTop: "20px", marginBottom: "20px"}}/>

        <Text fontSize="16px">
            To have advantage over other brave warriors you can upgrade abilities of your Katt by using special combat cards. Each card can improve one of three parameters such as attack, defense or intellect. After the mint, it will allow you to earn more on Ketts staking. Moreover, combat cards will give you early access to "Pool Wars Events" v0.
        </Text>

    </>
}
