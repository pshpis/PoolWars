import {Box, Center, Flex, HStack, Stack} from "@chakra-ui/react";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import Link from "next/link";
import Image from "next/image";
import logoPic from "../../../../public/logo-bright.svg";
import logoTxtPic from "../../../../public/logo-txt.svg";

export const Logo = ({height, width}) => {
    const size = useWindowSize();
    return <Link href="/">
        <HStack width={width !== null ? width : ""} marginRight={size.width > 850? "7.15vw" : "25px"}
                mt="3px"
                spacing="12px" cursor="pointer">
            <Image alt="Logo" src={logoPic}
                   height={height !== null ? height : size.width > 800 ? "40px" : "30px"}
                   width={size.width > 800 ? "40px" : "30px"}/>
            <Center>
                <Image alt="Logo text" src={logoTxtPic}
                       height={height !== null ? height : size.width > 800 ? "40px" : "30px"}/>
            </Center>
        </HStack>
    </Link>
}