import {Heading, Text} from "@chakra-ui/react";

export const Governance = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Governance</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about DAO</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">We will create a <b>DAO</b>. It will work with our token, which you can get by staking your nft. After our main steps on the roadmap DAO will become the main governance at our project. So the community can vote for decisions such as <b>ruffles</b> and <b>collaborations</b> or the release of <b>new defi tools</b> or other features.
        </Text>
    </>;
}