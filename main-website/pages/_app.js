import '../styles/globals.css'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
    let result = <>
        <Component {...pageProps} />
    </>;

    if (Component.needChakra)
        result = <ChakraProvider>{result}</ChakraProvider>

    if (Component.needThirdweb)
        result = <ThirdwebProvider desiredChainId={ChainId.Polygon}>{result}</ThirdwebProvider>

    return result;
}

export default MyApp
