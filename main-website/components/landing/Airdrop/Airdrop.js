import {Header} from "../Layout/Header/Header";
import {Box} from "@chakra-ui/react";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {PicPreview} from "../MainPage/PicPreview";
import {AirdropForm} from "./AirdropForm";
import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";

export const Airdrop = () => {
    return <Box paddingTop="77px" overflowY="hidden">
        <AllSpots/>
        <Header/>
        <AirdropForm/>
        <PicPreview/>
    </Box>
}