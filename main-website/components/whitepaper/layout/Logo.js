import {Center, HStack, Text} from "@chakra-ui/react";
import Image from "next/image";
import logoPic from "../../../public/logo.svg";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useMemo} from "react";

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
    const size = useWindowSize();
    const marginLeft = useMemo(() => {
        if (size.width > 1500){
            return ((size.width - 910) / 2 - 300 + "px");
        }
        return "0px";
    }, [size.width]);

    return (
      <Center marginLeft={marginLeft} width={size.width > 800 ? "100%" : "229px"} height="100%" position="relative">
          <HStack spacing="16px">
              <Image alt="Logo" style={{marginRight:"16px"}} src={logoPic} height={size.width > 800 ? "40px" : "30px"} width={size.width > 800 ? "40px" : "30px"} />
              <Text color="rgb(59, 69, 78)" fontSize="1.15em"><b>The Elder Katts</b></Text>
          </HStack>

          {size.width > 800 ? <BorderRight/> : ""}
      </Center>
    );
}