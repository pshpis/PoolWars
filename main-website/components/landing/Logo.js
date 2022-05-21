import {Box, HStack} from "@chakra-ui/react";

export const Logo = () => {
    return <HStack marginRight="7.15vw" fontSize="24px" fontFamily="trap" letterSpacing="0.12em" mt="3px" spacing={0}>
        <Box color="#E8E3DD" fontWeight="900">POOL</Box>
        <Box color="#C4F57C" fontWeight="700" marginLeft="0">WARS</Box>
    </HStack>
}