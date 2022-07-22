import {Text, Box, Flex, Divider, HStack, VStack, Img, Grid, GridItem, Center, BoxProps} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useMemo} from "react";

const Member = ({src, title, children, boolean}) => {
    const size = useWindowSize();
    return <Box>
        <Img mb="16px" width="294px" height="294px" borderRadius="24px" src={src}
             filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));"/>
        <Box fontSize="32px" lineHeight="37.5px" color="#71CFC3">
            {boolean ? <HStack maxWidth="294px" justifyContent="center">
                    <Text fontWeight={600}>{title}</Text>
                    <Text fontWeight={300}>{children}</Text>
                </HStack>
                : <Box maxWidth="294px" textAlign="center">
                    <Text fontWeight={600}>{title}</Text>
                    <Text fontWeight={300}>{children}</Text>
                </Box>

            }
        </Box>
    </Box>
}

export const Team = (props: BoxProps) => {
    const size = useWindowSize();

    const defaultPadding = useMemo(() => {
        if (size.width < 360) return 10;
        if (size.width < 1200) return 30;
        else return 96;
    }, [size.width]);

    return <Box pl={defaultPadding+"px"} pr={defaultPadding+"px"} {...props}>
        <Divider mb="80px" borderColor="#E8E8E826" border="0.5px"/>
        <HStack pb="80px" fontWeight="400" fontSize={size.width < 768 ? "48px" : "64px"} lineHeight="52px" spacing={0}>
            <Text fontFamily="Njord Alternate">O</Text><Text fontFamily="Njord">UR TEAM</Text>
        </HStack>
        <Center>
            <Grid templateColumns={size.width < 856 ? 'repeat(1, 1fr)' : size.width < 1248 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                  gap="76px">
                <GridItem>
                    <Member src="/teamNFTs/1.png" title="Hidden" boolean={true}>CEO</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/21.png" title="Vighbiørn" boolean={true}>CTO</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/96.png" title="Bjørn" boolean={true}>Head of Design</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/16.png" title="Hashira" boolean={false}>Project Manager</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/99.png" title="Malevol" boolean={false}>Blockchain Developer</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/3.png" title="Måns" boolean={false}>Community Manager</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/82.png" title="KAI_ANGEL" boolean={false}>Content Creator</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/5.png" title="Ødger" boolean={false}>Illustrator</Member>
                </GridItem>
                <GridItem>
                    <Member src="/teamNFTs/69.png" title="Vinter" boolean={false}>Illustrator</Member>
                </GridItem>
            </Grid>
        </Center>
    </Box>
}