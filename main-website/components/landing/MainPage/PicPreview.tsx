import {Box, Img} from "@chakra-ui/react";
import {Carousel, CarouselSettings} from "../Carousel";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const PicPreview = () => {
    const carouselSettings : CarouselSettings = {
        animationDuration: 2.2,
        delta: 28,
        elementHeight: 448,
        elementWidth: 320,
        toLeft: true,
    }

    const imgCount = 9;
    const imgUrl = "/increaseNft/";

    const imgArr = [];
    for (let i = 0 ; i < imgCount; i ++){
        let img = <Img src={imgUrl + (i + 1) + ".png"} width={carouselSettings.elementWidth + "px"} height={carouselSettings.elementHeight + "px"}
                       mr={carouselSettings.delta+"px"}
                       key={imgUrl + (i + 1) + ".png"}/>
        imgArr.push(img);
    }
    shuffleArray(imgArr);



    return <Box width="100%" margin="100px 0">
        <Carousel settings={carouselSettings}>
            {imgArr}
        </Carousel>
    </Box>


}