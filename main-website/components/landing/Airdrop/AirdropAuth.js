import {FirstSpot} from "../Layout/BackgroundSpots/FirstSpot";
import {Header} from "../Layout/Header/Header";
import {Box, Button, Center, FormControl, FormLabel, Heading, Input, Stack} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {useEffect, useState} from "react";

export const AirdropAuth = () => {
    const size = useWindowSize();

    return <Box paddingTop="77px" overflowY="hidden">
        <FirstSpot/>
        <Header/>
        <Box padding="40px 5.5%" minH={size.height-77} >
            <Heading textAlign="center" mb="30px" fontSize="60px" fontFamily="trap">Airdrop Auth Form</Heading>
            <FormControl mb="30px">
                <FormLabel mb="15px" fontSize="24px">Please subscribe our Telegram chanel and write your telegram nickname here.</FormLabel>
                <Stack direction="row" height="60px">
                    <Input type="text" h="100%" fontSize="24px"/>
                    <Button colorScheme="blue" width="150px" h="100%" fontSize="24px">Check</Button>
                </Stack>
            </FormControl>
            <FormControl mb="30px">
                <FormLabel mb="15px" fontSize="24px">Please subscribe our Telegram chanel and write your telegram nickname here.</FormLabel>
                <Stack direction="row" height="60px">
                    <Input type="text" h="100%" fontSize="24px"/>
                    <Button colorScheme="blue" width="150px" h="100%" fontSize="24px">Check</Button>
                </Stack>
            </FormControl>
            <FormControl mb="30px">
                <FormLabel mb="15px" fontSize="24px">Please subscribe our Telegram chanel and write your telegram nickname here.</FormLabel>
                <Stack direction="row" height="60px">
                    <Input type="text" h="100%" fontSize="24px"/>
                    <Button colorScheme="blue" width="150px" h="100%" fontSize="24px">Check</Button>
                </Stack>
            </FormControl>
            <Center><Button colorScheme="green" width="300px" height="60px" fontSize="32px">Get my NFT</Button></Center>
        </Box>
    </Box>
}