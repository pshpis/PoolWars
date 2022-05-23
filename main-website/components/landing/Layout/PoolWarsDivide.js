import {Box, HStack} from "@chakra-ui/react";

export const PoolWarsDivide = () => {
    let secondColors = ["#7951F5", "#333CED", "#B8C3E6", "#C4F57C"]
    let phrasesFirst = [];
    for (let i = 0; i < 10; i ++){
        secondColors.forEach(color => {
           let phrase = <HStack textOverflow="clip" spacing="0.08em">
               <Box color="#E8E3DD" textOverflow="clip">POOL</Box>
               <Box color={color} textOverflow="clip" fontWeight="600">WARS</Box>
           </HStack>;
            phrasesFirst.push(phrase);
        });
    }

    let phrasesSecond=[];
    for (let i = 0; i < 10; i ++){
        secondColors.forEach(color => {
            let phrase = <HStack textOverflow="clip" spacing="0.08em">
                <Box color={color} textOverflow="clip" fontWeight="600">WARS</Box>
                <Box color="#E8E3DD" textOverflow="clip" >POOL</Box>
            </HStack>;
            phrasesSecond.push(phrase);
        });
    }
    return <Box zIndex="999">
        <HStack width="100%" height="48px" overflow="hidden"
            fontFamily="Trap" fontWeight="900" fontSize="42px" textOverflow="clip"
            spacing={"0.08em"} letterSpacing="0.08em">
        {phrasesFirst}
        </HStack>
        <HStack width="100%" height="48px" overflow="hidden"
                fontFamily="Trap" fontWeight="900" fontSize="42px" textOverflow="clip"
                spacing={"0.08em"} letterSpacing="0.08em">
            {phrasesSecond}
        </HStack>
    </Box>
}