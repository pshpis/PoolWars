import {Box, Center, Flex, HStack, Text} from "@chakra-ui/react";
import Image from "next/image";
import logoPic from "../../../public/logo.png";

const BorderRight = () => {
    let style = {
        "borderRight": "1px solid rgba(211,220,228,1.00)",
        "position": "absolute",
        "top": "25%",
        "right": "0",
        "height": "50%",
        "bottom": "0",
    };
    return <div style={style}>
    </div>;
}

export const Logo = () => {
    return (
      <Center width="100%" height="100%" position="relative">
          <HStack>
              <Image style={{marginRight:"16px"}} src={logoPic} height="40px" width="40px"/>
              <Text color="rgb(59, 69, 78)" fontSize="1.15em"><b>Pool Wars #Warlords</b></Text>
          </HStack>

          <BorderRight/>
      </Center>
    );
}