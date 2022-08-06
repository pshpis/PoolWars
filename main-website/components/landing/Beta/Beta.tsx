import Layout from "../Layout/Layout";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {Flex, Input} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie'

export const Beta = () => {
    const size = useWindowSize();
    const secretPhrase = "f4y4hANN0wOPYCaQbi6Pp4cpDkCxR2";

    const [verified, setVerified] = useState(false);
    useEffect(() => {
        if (Cookies.get(secretPhrase) == secretPhrase)
            setVerified(true);
        console.log(verified);
    }, []);

    return <Layout>
        {!verified
            ?
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">
                <Input w="500px" border="2px" borderColor="#71CFC3" color="71CFC3" placeholder="Secret phrase" onChange={ (evt) => {
                    // @ts-ignore
                    const tempSecretPhrase = evt.target.value;
                    if (secretPhrase === tempSecretPhrase) {
                        Cookies.set(secretPhrase, tempSecretPhrase);
                        setVerified(true);
                    }
                }}/>
            </Flex>
            :
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">
                You have successfully passed verification.
            </Flex>
        }
    </Layout>
}