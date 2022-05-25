import {Header} from "../Layout/Header/Header";
import {Box} from "@chakra-ui/react";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {PicPreview} from "../MainPage/PicPreview";
import {AirdropForm} from "./AirdropForm";

export const Airdrop = () => {
    return <Box paddingTop="77px" overflowY="hidden">
        <FirstSpot/>
        <Header/>
        <AirdropForm/>
        <PicPreview/>
    </Box>
}