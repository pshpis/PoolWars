import {Box, HStack} from "@chakra-ui/react";

export const PoolWarsDivide = () => {
    let secondColors = ["#7951F5", "#333CED", "#B8C3E6", "#C4F57C"]
    let phrasesFirst = [];
    let id = 0;
    for (let i = 0; i < 10; i ++){
        secondColors.forEach(color => {
            let key1 = "DivideWord" + id;
            id ++;
            let key2 = "DivideWord" + id;
            id ++;
            let phrase = <HStack textOverflow="clip" spacing="0.08em" key={"LocalStack" + id}>
               <Box color="#E8E3DD" textOverflow="clip" key={key1}>POOL</Box>
               <Box color={color} textOverflow="clip" fontWeight="600" key={key2}>WARS</Box>
           </HStack>;
            phrasesFirst.push(phrase);
        });
    }

    let phrasesSecond=[];
    for (let i = 0; i < 10; i ++){
        secondColors.forEach(color => {
            let key1 = "DivideWord" + id;
            id ++;
            let key2 = "DivideWord" + id;
            id ++;
            let phrase = <HStack textOverflow="clip" spacing="0.08em" key={"LocalStack" + id}>
                <Box color={color} textOverflow="clip" fontWeight="600" key={key1}>WARS</Box>
                <Box color="#E8E3DD" textOverflow="clip" key={key2}>POOL</Box>
            </HStack>;
            phrasesSecond.push(phrase);
        });
    }
    return <Box zIndex="999">
        <HStack width="100%" height="48px" overflow="hidden" key="GlobalStack1"
            fontFamily="Trap" fontWeight="900" fontSize="42px" textOverflow="clip"
            spacing={"0.08em"} letterSpacing="0.08em">
        {phrasesFirst}
        </HStack>
        <HStack width="100%" height="48px" overflow="hidden" key="GlobalStack2"
                fontFamily="Trap" fontWeight="900" fontSize="42px" textOverflow="clip"
                spacing={"0.08em"} letterSpacing="0.08em">
            {phrasesSecond}
        </HStack>
    </Box>
}