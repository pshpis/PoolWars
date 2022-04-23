import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Polygon}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
