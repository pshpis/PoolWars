import {Button, FormControl, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";

export const AirdropForm = () => {
    const size = useWindowSize();
    return <FormControl pl="5.5%">
        <Text fontFamily="Trap" fontWeight="900" fontSize={size.width >= 768 ? "80px" : "40px"}  mt="77px" mb="44px" lineHeight="1.1">
            Write your code here
        </Text>
        <InputGroup width="88.8vw" size="md" height="107px" >
            <Input type="text" width="100%" height="107px" backgroundColor="rgba(232, 227, 221, 0.09);"
                   boxShadow=" inset 4.51333px -4.51333px 4.51333px rgba(195, 191, 186, 0.464), inset -4.51333px 4.51333px 4.51333px rgba(255, 255, 255, 0.464)"
                   backdropFilter="blur(29.788px)" borderRadius="60px" fontSize="30px"/>
            <InputRightElement width={size.width >= 768 ? "197px" : "100px"} height="65px" borderRadius="52px" mt="21px" mr="30px">
                <Button backgroundColor="#B8C3E6" color="#333CED"
                        width={size.width >= 768 ? "197px" : "100px"} height="65px" borderRadius="52px"
                        lineHeight="65px" textAlign="center"
                        fontWeight="800" fontFamily="Trap" fontSize="34px" type="submit">
                    Get
                </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>
}