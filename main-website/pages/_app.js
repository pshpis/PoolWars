import '../styles/globals.css'
import {ThirdwebProvider} from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const desiredChainId = 80001;

  return (
          <ChakraProvider>
              <Component {...pageProps} />
          </ChakraProvider>
  );

}

export default MyApp
