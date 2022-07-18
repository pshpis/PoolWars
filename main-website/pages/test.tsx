import {useCallback, useEffect, useState} from "react";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Profile} from "../components/landing/Profile/Profile";
import {Box, Button} from "@chakra-ui/react";
import {AllSpots} from "../components/landing/Layout/BackgroundSpots/AllSpots";
import {Header} from "../components/landing/Layout/Header/Header";
import {useWallet} from "@solana/wallet-adapter-react";
import base58 from "bs58";
import {signMessage} from "@toruslabs/base-controllers";
import {publicKey} from "@solana/web3.js/src/layout";

function Home() {
    const walletContextState = useWallet();

    const handleSignIn = useCallback(async () => {
        console.log(walletContextState.publicKey?.toBase58());
        let message = new TextEncoder().encode('Hello, world!');
        if (walletContextState.signMessage){
            const signature = await walletContextState.signMessage(message);
            console.log(signature);
            console.log(base58.encode(signature));
            console.log(JSON.stringify(signature));

        }
    }, []);
    return (
        <Box overflow="hidden" paddingTop="100px">
            {LandingStyles}
            <AllSpots/>
            <Header/>
            <Button onClick={handleSignIn} colorScheme="blue">Sign in!</Button>
        </Box>
    );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
