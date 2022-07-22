import {
    Box, Button,
    Center, Divider, Flex, HStack, Stack,
    Text, useToast, VStack
} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {ElderKattsBox} from "../Layout/ElderKattsBox";
import Image from "next/image";
import userPic from "../../../public/User.svg";
import noItemsPic from "../../../public/No-items-icon.svg";
import {useWallet} from "@solana/wallet-adapter-react";
import styles from "../../../styles/profile.module.scss";
import Layout from "../Layout/Layout";
import {useWalletAuth} from "../../../hooks/useWalletAuth";
import {useSocialConnect} from "../../../hooks/useSocialConnect";

export const Profile = () => {
    const size = useWindowSize();
    const toast = useToast();
    let toastId = '';
    const onFakeClick = () => {
        if (!toast.isActive(toastId)){
            toast({
                id: toastId,
                title: 'This feature will be available soon',
                status: 'info',
                position: 'top',
                isClosable: true,
            });
        }
    }

    const walletAuthObj = useWalletAuth();
    const {walletAddressView, onSignToggle, isSigned, connected} = walletAuthObj;
    const {discordButtonText, onDiscordButtonClick, onDiscordButtonLeave, onDiscordButtonEnter} = useSocialConnect(walletAuthObj);

    return <Layout>
        {!connected ?

            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Box mb="160px" pt="5.5%" pl="6.6%" pr="6.6%" w="100%">
                <Stack direction={size.width > 1000 ? "row" : "column"}
                       spacing="72px" w="100%" maxW="1248px" margin="0 auto">
                    <Stack pt="32px" pl="23px" pr="23px" pb="32px" as={ElderKattsBox}
                           direction={size.width > 1000 ? "column" : size.width > 630 ? "row" : "column"}
                           spacing={"32px"} justifyContent="space-between">
                        <Box>
                            <Center mb="16px"><Image src={userPic}/></Center>
                            <Center>
                                <Box mb="8px" pt="9px" pb="9px" h="40px" w="200px" backgroundColor="#313131" color="#71CFC3"
                                     borderRadius="16px"
                                     fontWeight={300} fontSize="20px" lineHeight="24px" textAlign="center">
                                    {walletAddressView}
                                </Box>
                            </Center>
                            <Center>
                                <Button pt="9px" pb="9px" h="40px" w="200px" backgroundColor="#B8C3E6" color="#202020"
                                        borderRadius="16px"
                                        fontFamily="Roboto Flex" fontWeight="600" fontSize="20px" lineHeight="24px"
                                        textAlign="center"
                                        transition="0.3s ease" onClick={onSignToggle}
                                        _hover={{
                                            boxShadow: "0px 4px 8px 0px #B8C3E680",
                                            color: "#202020",
                                            background: "#B8C3E6",
                                        }}>
                                    {isSigned ? "Sign out" : "Sign in"}
                                </Button>
                            </Center>
                        </Box>

                        <Divider borderColor="#E8E8E826" border="0.5px"
                                 hidden={size.width > 1000 ? false : size.width > 630}/>
                        <Box marginLeft="auto">
                            <Text mb="32px" fontFamily="Njord" fontWeight="400" fontSize="24px" lineHeight="28px"
                                  textAlign="center">
                                Connected <br/>Accounts
                            </Text>
                            <VStack>
                                <Box className={styles.socialButton}
                                     onClick={onDiscordButtonClick}
                                     onMouseEnter={onDiscordButtonEnter}
                                     onMouseLeave={onDiscordButtonLeave}>
                                    <Flex p="0" alignItems="center" w="100%">
                                        <Box className={styles.socialButton_iconplace}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                                 viewBox="0 0 640 512" focusable="false" className="chakra-icon css-f2aljx"
                                                 height="32px" width="32px" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
                                            </svg>
                                        </Box>
                                        <Box className={styles.socialButton_main}>
                                            {discordButtonText}
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box className={styles.socialButton} onClick={onFakeClick}>
                                    <Flex p="0px" alignItems="center" w="100%">
                                        <Box className={styles.socialButton_iconplace}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                                 viewBox="0 0 512 512" focusable="false" className="chakra-icon css-1dwgyre"
                                                 height="32px" width="32px" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                                            </svg>
                                        </Box>
                                        <Box className={styles.socialButton_main}>
                                            Connect
                                        </Box>
                                    </Flex>
                                </Box>
                            </VStack>
                        </Box>

                    </Stack>

                    <Box w="100%" alignSelf="start">
                        <HStack mb="16px" direction="row">
                            <Button w="140px" h="40px" background="#B2B2B2" color="#202020" borderRadius="16px"
                                    fontFamily="Roboto FLex" fontWeight="600" fontSize="20px" lineHeight="24px">
                                My NFTs
                            </Button>
                            <Button w="140px" h="40px" border="2px" borderColor="#B2B2B2" background="#202020"
                                    color="#B2B2B2" borderRadius="16px"
                                    fontFamily="Roboto FLex" fontWeight="600" fontSize="20px" lineHeight="24px"
                                    _hover={{boxShadow: "0 0 8px rgba(178, 178, 178, 0.75)"}} onClick={onFakeClick}>

                                Activities
                            </Button>
                        </HStack>
                        <Divider mt="32px" mb="160px" borderColor="#E8E8E826" border="0.5px"/>
                        <VStack>
                            <Image src={noItemsPic}/>
                            <Text fontStyle="Roboto Flex" fontWeight="600" fontSize="32px" lineHeight="37.5px"
                                  color="#D3CDC640;">No items</Text>
                        </VStack>
                    </Box>
                </Stack>
            </Box>
            }
    </Layout>;
}