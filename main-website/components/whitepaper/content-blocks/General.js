import {Heading, Text} from "@chakra-ui/react";

export const General = () => {
    return <>
        <Heading fontSize="48px" lineHeight="54px">General</Heading>
        <Text fontSize="16px" color="rgba(136,153,168,1.00)" marginTop="16px">General information about Pool Wars project</Text>
        <hr style={{marginTop: "20px",marginBottom:"20px"}}/>

        <Text fontWeight="700" fontSize="16px">
            “Pool Wars” team released an exclusive Play-To-Earn NFT collection built on Polygon, including 20,000 Warlords which are the main part of the &quot;Battle of Conquerors&quot; Metaverse. Warlords NFT will soon be available for minting from our “Pool Wars” website.
        </Text>
        <hr style={{marginTop: "20px", marginBottom: "20px"}}/>

        <Text fontSize="16px">
            The Collection contains 4 types of exclusive Warlords, which include <b>World</b>, <b>World Legends</b>, <b>Rebels</b> and <b>Epos Legends</b>. The rarest Warlord NFT type is the <b>Epos Legends</b>. <br/> <br/>
            The Warlords NFT collection includes famous warlords from various states such as <b>Ancient Rome</b>, <b>Ancient Greece</b>, <b>America</b>, <b>Germany</b>, <b>France</b>, <b>Spain</b>, <b>Russia</b>, <b>China</b>, <b>India</b>, <b>Japan</b> and others, who had a huge impact on the world, which we live in today. Also our collection has several famous <b>rebels</b>, who changed the world, and a few popular <b>army commanders from books and movies</b>.
        </Text>

    </>
}
