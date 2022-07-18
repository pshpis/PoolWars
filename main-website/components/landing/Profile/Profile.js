import {Header} from "../Layout/Header/Header";
import {
    Box, Button,
    Center, Divider, Flex, HStack, Icon,
    SimpleGrid, Spacer, Stack,
    Text, VStack
} from "@chakra-ui/react";
import {PoolWarsDivider} from "../Layout/PoolWarsDivider";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useMemo} from "react";
import {ProfileCard} from "./ProfileCard";
import {PoolWarsBox} from "../Layout/PoolWarsBox";
import {AllSpots} from "../Layout/BackgroundSpots/AllSpots";
import {Footer} from "../Layout/Footer/Footer";
import {ElderKattsBox} from "../Layout/ElderKattsBox";
import {FaDiscord, FaTwitter} from "react-icons/fa";
import Image from "next/image";
import userPic from "../../../public/User.svg";
import noItemsPic from "../../../public/No-items-icon.svg";
import {VoidSigner} from "ethers";
import {useWallet} from "@solana/wallet-adapter-react";
import {sign} from "crypto";
import styles from "../../../styles/discord.module.css";

export const Profile = ({cards}) => {
    const size = useWindowSize();
    const { publicKey, connected, connecting, disconnect,  } = useWallet();
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const walletButtonContent = useMemo(() => {
        if (!connected) return "Select Wallet";
        if (connecting) return "Connecting...";
        return base58.slice(0, 5) + '...' + base58.slice(-5);
    }, [connected, connecting]);

    return <Box paddingTop="77px" overflow="hidden">
        <AllSpots/>
        <Header/>
        { !connected ?

        <Flex h={size.height-64+"px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet to see your profile page.</Flex>
        :
            <HStack mb="160px" pt="80px" pl="96px" pr="96px">
                <ElderKattsBox pt="32px" pl="23px" pr="23px" pb="32px" mr="72px">
                    <Center mb="16px"><Image src={userPic}/></Center>
                    <Box mb="8px" pt="9px" pb="9px" h="40px" w="200px" backgroundColor="#313131" color="#71CFC3"
                         borderRadius="16px"
                         fontFamily="Roboto Flex" fontWeight="600" fontSize="20px" lineHeight="24px" align="center">
                        {walletButtonContent}
                    </Box>
                    <Button pt="9px" pb="9px" h="40px" w="200px" backgroundColor="#B8C3E6" color="#202020"
                            borderRadius="16px"
                            fontFamily="Roboto Flex" fontWeight="600" fontSize="20px" lineHeight="24px" align="center"
                            transition="0.3s ease"
                            _hover={{boxShadow: "0px 4px 8px 0px #B8C3E680",
                                color: "#202020",
                                background: "#B8C3E6",}}>
                        <Text>Sign in</Text>
                    </Button>
                    <Divider mt="32px" mb="32px" borderColor="#E8E8E826" border="0.5px"/>
                    <Text mb="32px" fontFamily="Njord" weight="400" fontSize="24px" lineHeight="28px"
                          textAlign="center">
                        Connected <br/>Accounts
                    </Text>
                    <VStack>
                        <Button className={styles.discordButton} p="0px">
                            <Flex p="0px" alignItems="center">
                                <Center w="59px"><Icon w="32px" h="31px" color="#71CFC3" as={FaDiscord} /></Center>
                                <Box h="64px" w="141px" backgroundColor="#71CFC3" border="2px" borderColor="#71CFC3"
                                     borderRadius="0px 16px 16px 0px" fontFamily="Roboto Flex" fontWeight="600"
                                     fontSize="20px"
                                     lineHeight="62px" color="#202020">
                                    Connect
                                </Box>
                            </Flex>
                        </Button>
                        <Button p="0px" border="2px" borderColor="#71CFC3" backgroundColor="#71CFC3" h="64px" w="200px"
                                borderRadius="16px">
                            <Flex p="0px" alignItems="center">
                                <Center w="59px"><Icon w="32px" h="31px" color="#202020" as={FaTwitter}/></Center>
                                <Box h="64px" w="141px" backgroundColor="#202020" border="2px" borderColor="#71CFC3"
                                     borderRadius="0px 16px 16px 0px" fontFamily="Roboto Flex" fontWeight="600"
                                     fontSize="20px"
                                     lineHeight="62px" color="#71CFC3">
                                    Connect
                                </Box>
                            </Flex>
                        </Button>
                    </VStack>
                </ElderKattsBox>

                <Box w="100%" alignSelf="start">
                    <HStack mb="16px" direction="row">
                        <Button w="140px" h="40px" background="#B2B2B2" color="#202020" borderRadius="16px"
                                fontFamily="Roboto FLex" fontWeight="600" fontSize="20px" lineHeight="24px">
                            My NFTs
                        </Button>
                        <Button w="140px" h="40px" border="2px" borderColor="#B2B2B2" background="#202020"
                                color="#B2B2B2" borderRadius="16px"
                                fontFamily="Roboto FLex" fontWeight="600" fontSize="20px" lineHeight="24px">
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
            </HStack>

        //     <SimpleGrid mt="50px" pb="50px" minChildWidth='320px' spacing="50px 10px" pl="10px" pr="10px">
        // {cards.map((card) => (
        //     <Center h="450px" key={card.metadata.id._hex}>
        //     <ProfileCard data={card} />
        //     </Center>
        //     ))}
        // {/*<Center h="450px">*/}
        // {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
        // {/*</Center>*/}
        //
        // {/*<Center h="450px">*/}
        // {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
        // {/*</Center>*/}
        // {/*<Center h="450px">*/}
        // {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
        // {/*</Center>*/}
        // {/*<Center h="450px">*/}
        // {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
        // {/*</Center>*/}
        // {/*<Center h="450px">*/}
        // {/*    <Box w="365px" h="450px" borderRadius="43px" backgroundColor="rgba(211, 205, 198, 0.1);"/>*/}
        // {/*</Center>*/}
        //     </SimpleGrid>
        }
        <Footer/>
    </Box>
}