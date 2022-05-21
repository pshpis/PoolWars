import '../styles/globals.css'
import {ThirdwebProvider} from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
    const desiredChainId = 80001;
    let result = <Component {...pageProps} />;

    if (Component.needChakra)
        result = <ChakraProvider>{result}</ChakraProvider>

    if (Component.needThirdweb)
        result = <ThirdwebProvider desiredChainId={desiredChainId}>{result}</ThirdwebProvider>

    return result;
}

export default MyApp
