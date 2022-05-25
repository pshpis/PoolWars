import {Box, HStack} from "@chakra-ui/react";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import Link from "next/link";

export const Logo = () => {
    const size = useWindowSize();
    return <Link href="/"><HStack marginRight={size.width > 850? "7.15vw" : "25px"}
                   fontSize="24px" fontFamily="trap" letterSpacing="0.12em" mt="3px"
                   spacing={0} cursor="pointer">
        <Box color="#E8E3DD" fontWeight="900">POOL</Box>
        <Box color="#C4F57C" fontWeight="700" marginLeft="0">WARS</Box>
    </HStack></Link>
}