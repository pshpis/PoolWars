import '../styles/globals.css'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import { ChakraProvider } from '@chakra-ui/react';

import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])
    let result = <>
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-0RN5S4CNFX`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0RN5S4CNFX', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
        <Component {...pageProps} />
    </>;

    if (Component.needChakra)
        result = <ChakraProvider>{result}</ChakraProvider>

    if (Component.needThirdweb)
        result = <ThirdwebProvider desiredChainId={ChainId.Polygon}>{result}</ThirdwebProvider>

    return result;
}

export default MyApp
