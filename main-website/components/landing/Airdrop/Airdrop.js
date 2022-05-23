import {Header} from "../Layout/Header/Header";
import {Box, Button, FormControl, Input, InputGroup, InputRightElement, Text} from "@chakra-ui/react";
import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {PicPreview} from "../MainPage/PicPreview";
import {AirdropForm} from "./AirdropForm";

export const Airdrop = () => {
    return <Box paddingTop="77px">
        <FirstSpot/>
        <Header/>
        <AirdropForm/>
        <PicPreview/>
    </Box>
}