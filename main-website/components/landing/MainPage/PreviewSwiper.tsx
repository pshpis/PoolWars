import {Swiper, SwiperSlide} from "swiper/react";
import {Box, BoxProps, Center, HStack, Img, Spacer} from "@chakra-ui/react";
import { Pagination, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "../../../styles/swiper.module.scss";
import {useState} from "react";
import {useWindowSize} from "../../../hooks/useWindowSize";

type CardData = {
    type: string,
    points: number,
}

function getCardImgName(data: CardData): string{
    return data.type + "_" + data.points + ".png";
}

function cardsDataFactory(types: Array<string>, points: Array<number>) : Array<CardData> {
    const res : Array<CardData> = [];
    points.forEach(points => {
        types.forEach(type => {
            res.push({type: type, points: points});
        })
    })
    return res;
}

function PreviewCard({data, index}: {data: CardData, index: number}){
    const size = useWindowSize();
    const [isInfoOpen, setInfoOpen] = useState(false);
    const switchInfo = () => {
        setInfoOpen(!isInfoOpen);
    }
    return <Box w="294px" key={data.type + data.points} position="relative">
        <Box position="absolute" height="294px" color="#202020" padding="24px"
             top={0} left={0} zIndex={30} borderRadius="24px 24px 0 0" transition="all 0.5s"
             backgroundColor="rgba(232, 232, 232, 75%)" opacity={isInfoOpen? "100%": "0"}>
            <b>Description:</b> <br/>
            This card will increase your Katt&apos;s {data.type} on {data.points} points. <br/>
            It will increase your staking rewards on stage 2. <br/>
            Also, you can use it in Pool Wars v0 and Nft Swaps on Stage 1.
        </Box>
        <Img src={"/increaseNft/" + getCardImgName(data)} w="294px" h="294px" borderRadius="24px 24px 0 0"/>
        <HStack borderRadius="0 0 24px 24px" w="100%" h="54px"
                backgroundColor="#E8E8E8"  padding="0 15px 0 24px">
            <Box fontWeight="600" fontSize={size.width > 500? "24px": "20px"} color="#949494">Combat card #{index+1}</Box>
            <Spacer/>
            <Img src="/plus.svg" onClick={switchInfo} transition="all 0.5s"
                 transform={isInfoOpen? "rotate(45deg)" : "rotate(0)"}/>
        </HStack>
    </Box>;
}

const PreviewSwiper = (props: BoxProps) => {
    const points : number[] = [1, 3, 6];
    const types : string[] = ["attack", "defence", "intelligence"];
    const cardsData : CardData[] = cardsDataFactory(types, points);
    const cardsJsx = cardsData.map((data, i) => <PreviewCard key={data.type+data.points} index={i} data={data}/>);

    return <Box {...props}><Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
            1440: {
                slidesPerView: 4,
            },
            1100: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        }}
        style={{
            // @ts-ignore
            "--swiper-navigation-color": "#71CFC3",
            "--swiper-pagination-color": "#71CFC3",
        }}
        pagination={{
            clickable: true,
        }}
        rewind={true}
        modules={[Navigation, Pagination]}
        className={styles.swiper}
    >
        {cardsJsx.map(cardJsx => <SwiperSlide key={cardJsx.key} className={styles.swiperSlide}><Center w="100%">{cardJsx}</Center></SwiperSlide>)}
    </Swiper></Box>
}

export default PreviewSwiper;