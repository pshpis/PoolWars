import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {Header} from "../Layout/Header/Header";
import {Box, Button, Center, FormControl, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useEffect, useState} from "react";
import {TwitterFormControl} from "./SubscribeFormsControls/TwitterFormControl";
import {DiscordFormControl} from "./SubscribeFormsControls/DiscordFormControl";

export const AirdropAuth = () => {
    const size = useWindowSize();

    return <Box paddingTop="77px" overflowY="hidden">
        <FirstSpot/>
        <Header/>
        <Box padding="40px 5.5%" minH={size.height-77} >
            <Heading textAlign="center" mb="30px" fontSize="60px" fontFamily="trap">Airdrop Auth Form</Heading>
            <TwitterFormControl mb="30px"/>
            <DiscordFormControl mb="30px"/>

            <Center><Button colorScheme="green" width="300px" height="60px" fontSize="32px">Get my NFT</Button></Center>
        </Box>
    </Box>
}