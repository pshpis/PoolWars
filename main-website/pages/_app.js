import '../styles/globals.css'
import {ThirdwebProvider} from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const desiredChainId = 80001;

  return (
      <ThirdwebProvider desiredChainId={desiredChainId}>
          <ChakraProvider>
              <Component {...pageProps} />
          </ChakraProvider>
      </ThirdwebProvider>
  );

}

export default MyApp
