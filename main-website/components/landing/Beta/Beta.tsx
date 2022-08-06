import Layout from "../Layout/Layout";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {Flex, Input} from "@chakra-ui/react";
import React from "react";
import Cookies from 'js-cookie'
import {useCookies} from "../../../hooks/useCookies";

export const Beta = () => {
    const size = useWindowSize();
    const {verify, setVerify, secretPhrase} = useCookies();

    return <Layout>
        {!verify
            ?
            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">
                <Input w="500px" border="2px" borderColor="#71CFC3" color="71CFC3" placeholder="Secret phrase" onChange={ (evt) => {
                    // @ts-ignore
                    const tempSecretPhrase = evt.target.value;
                    if (secretPhrase === tempSecretPhrase) {
                        Cookies.set("secretPhrase", tempSecretPhrase);
                        setVerify(true);
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