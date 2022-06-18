import { ChakraProvider } from '@chakra-ui/react';
import {useMemo} from "react";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter, TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

function MyApp({ Component, pageProps }) {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );


    let result = <>
        <Component {...pageProps} />
    </>;

    if (Component.needChakra)
        result = <ChakraProvider>{result}</ChakraProvider>

    if (Component.needWeb3)
        result = <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{result}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    return result;
}

export default MyApp
