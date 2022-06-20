import {Box, HStack} from "@chakra-ui/react";
import {Carousel, CarouselSettings} from "../Carousel";
import {SimpleSlider} from "./SimpleSlider";

export const PoolWarsDivider = () => {
    let secondColors = ["#7951F5", "#333CED", "#B8C3E6", "#C4F57C"]
    let phrasesFirst = [];
    let id = 0;
    for (let i = 0; i < 10; i ++){
        secondColors.forEach(color => {
            let key1 = "DivideWord" + id;
            id ++;
            let key2 = "DivideWord" + id;
            id ++;
            let phrase = <HStack textOverflow="clip" spacing="0" key={"LocalStack" + id} fontSize="42px" height="48px">
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
            let phrase = <HStack textOverflow="clip" spacing="0" key={"LocalStack" + id} fontSize="42px" height="48px">
                <Box color={color} textOverflow="clip" fontWeight="600" key={key1}>WARS</Box>
                <Box color="#E8E3DD" textOverflow="clip" key={key2}>POOL</Box>
            </HStack>;
            phrasesSecond.push(phrase);
        });
    }

    const settings1 : CarouselSettings = {
        animationDuration: 2,
        delta: 0,
        elementHeight: 48,
        elementWidth: 228,
        toLeft: true,
    }
    const settings2 : CarouselSettings = {
        animationDuration: 2,
        delta: 0,
        elementHeight: 48,
        elementWidth: 228,
        toLeft: true,
    }
    return <Box zIndex="999">
        <Carousel settings={settings1}>
            {phrasesFirst}
        </Carousel>
        <Carousel settings={settings2}>
            {phrasesSecond}
        </Carousel>
    </Box>
}