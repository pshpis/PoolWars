import {Heading, Text} from "@chakra-ui/react";

export const Governance = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">Governance</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">Information about DAO</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text padding="8px 0px" fontSize="16px" lineHeight="24px">
            We will create a <b>DAO</b>. Our DAO will determine the future of the project. We will be a middleman between you and most talented professionals in the industry. After our main steps on the roadmap DAO will become the main governance at our project. The community will be able to vote for decisions such as <b>raffles</b> and <b>collaborations</b> or the <b>release of new DeFi tools</b> or other features.
        </Text>
    </>;
}
