import {
    Box,
    Button,
    Center,
    Divider,
    Flex, Grid, GridItem,
    HStack, Img,
    Modal,
    ModalContent, ModalOverlay,
    Spacer,
    Stack,
    Text,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useEffect, useMemo, useState} from "react";
import {ElderKattsBox} from "../Layout/ElderKattsBox";
import Image from "next/image";
import userPic from "../../../public/User.svg";
import noItemsPic from "../../../public/No-items-icon.svg";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import styles from "../../../styles/profile.module.scss";
import Layout from "../Layout/Layout";
import {useWalletAuth} from "../../../hooks/useWalletAuth";
import {useSocialConnect} from "../../../hooks/useSocialConnect";
import {getMetadataByMintAddress, NFTStatWithMints, parseCards} from "../../../lib/nft-helper";
import {ProfileNFTSPanel} from "./ProfileNFTsPanel";
import clsx from "clsx";
import {useProfilePanel} from "../../../hooks/useProfilePanel";
import {
    Event,
    EventsWrapper,
    fetchEvents,
    isPoolWarV0Event,
    isSwapEvent,
    PoolWarV0Event,
    SwapEvent,
    Win
} from "../../../lib/events";
import {Connection, PublicKey, Transaction} from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createTransferCheckedInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, transferChecked, transferCheckedInstructionData } from "@solana/spl-token";
import { takeCard } from "../../../lib/pool-wars";
import {forEachComment} from "tsutils";

const MyNFts = ({NFTsStats}) => {
    return <Box>
        {NFTsStats.length === 0 ?
            <VStack mt="140px">
                <Image src={noItemsPic}/>
                <Text fontStyle="Roboto Flex" fontWeight="600" fontSize="32px" lineHeight="37.5px"
                      color="#D3CDC640;">No items</Text>
            </VStack>
        :
            <ProfileNFTSPanel NFTsStats={NFTsStats}/>
        }
    </Box>
}

const Swap = ({inputCards, outputCard, isOpen, connection} : {inputCards: SwapEvent['inputCards'], outputCard: SwapEvent['outputCard'], isOpen: boolean,connection: Connection}) => {
    const size = useWindowSize();
    const [load, setLoad] = useState<boolean>(false);
    const [outputNFTSrc, setOutputNFTSrc] = useState<string>();
    const [inputNFTs, setInputNFTs] = useState([]);

    const imgWidth : number = useMemo(() => {
        if (size.width < 400) return 80;
        if (size.width < 500) return 100;
        else return 188;
    }, [size.width]);

    useEffect(() => {
        async function load() {
            setLoad(false);
            const outputNFTSrc = (await getMetadataByMintAddress(outputCard, connection)).src;
            console.log(outputNFTSrc);
            setOutputNFTSrc(_ => outputNFTSrc);
            let newNFTs = [];
            for (const nft of inputCards) {
                const nftSrc = (await getMetadataByMintAddress(nft, connection)).src;
                console.log(nftSrc);
                newNFTs.push(<Img w={imgWidth+"px"} h={imgWidth+"px"} src={nftSrc} borderRadius="16px" boxShadow="0px 0px 16px 0px #20202080" filter="drop-shadow(0px 0px 0px 16px #20202080)"/>);
            }
            setInputNFTs(newNFTs);
            setLoad(true);
        }
        load()
    }, [isOpen, (size.width < 500), (size.width > 500)]);

    return <ModalContent maxW="80%" backgroundColor="inherit">
        <Center>
            <ElderKattsBox pt="56px" pl={size.width < 624 ? "24px" : "106px"} pr={size.width < 624 ? "24px" : "106px"} pb="75px" w="100%">
                <Text mb="48px" fontFamily="Njord" fontWeight="400" fontSize={size.width < 660 ? "28px" : "48px"}
                      lineHeight={size.width < 660 ? "34px" : "50px"} textAlign="center">
                    successful SWAP
                </Text>
                {
                    !load ?
                        <Flex alignItems="center" justifyContent="center">
                            <div className={styles.donut}/>
                        </Flex>
                        :
                        <Center>
                            <Stack direction={size.width > 1000 ? "row" : "column"} alignItems="center">
                                <HStack spacing={size.width < 500 ? -imgWidth/2+"px" : -imgWidth/2+"px"}>
                                    {inputNFTs}
                                </HStack>
                                <Img pl="32px" pr="52px" src="/swap-transition.svg" transform={size.width > 1000 ? "" : "rotate(90deg)"}/>
                                <Img w={imgWidth+"px"} h={imgWidth+"px"} src={outputNFTSrc} borderRadius="16px"
                                     boxShadow="0px 0px 50px 0px #71CFC380"/>
                            </Stack>
                        </Center>
                }
            </ElderKattsBox>
        </Center>
    </ModalContent>
}

const NFT = ({src, mint, result, taken} : {src: string, mint: string, result: PoolWarV0Event['result'], taken: boolean}) => {

    const wallet = useWallet();
    const { connection } = useConnection();

    async function take() {
        
        const destinationAddress = await getAssociatedTokenAddress(new PublicKey(mint), wallet.publicKey, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
        let needsInitialize = true;

        try {
            const account = await connection.getAccountInfo(destinationAddress);
            
            if (account.lamports > 0) {
                needsInitialize = false;
            }
        }
        catch (e) {

        }

        let sourceAddress: PublicKey = undefined;
        let pool: PublicKey = undefined;

        try {
            const largest = await connection.getTokenLargestAccounts(new PublicKey(mint), 'finalized')
            sourceAddress = largest.value[0].address;
            const tokenAccInfo = await connection.getParsedAccountInfo(sourceAddress, 'finalized');
            
            pool = new PublicKey((tokenAccInfo.value.data as any).parsed.info.owner);

        } catch(e) {
            return;
        }

        const tx = new Transaction();
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash

        if (needsInitialize) {
            tx.add(createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                destinationAddress,
                wallet.publicKey,
                new PublicKey(mint),
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            ))
        }

        tx.add(createTransferCheckedInstruction(
            sourceAddress,
            new PublicKey(mint),
            destinationAddress,
            pool,
            1,
            0,
            [],
            TOKEN_PROGRAM_ID
        ))

        const signed = await wallet.signTransaction(tx);
        await takeCard(signed, mint, pool.toBase58())
    }

    return <GridItem w="188px">
        {
            result === 0 ?
                <>
                    <Img w="100%" h="188px" src={src} borderRadius="16px"/>
                    <Center>
                        <Box onClick={taken ? void(0) : take} w="80%" h="32px" mt="10px" fontWeight="600" fontSize="18px" lineHeight="32px" textAlign="center"
                             color="#202020" backgroundColor={taken ? "#71CFC3" : "#B8C3E6"} borderRadius="16px" _hover={{boxShadow: "0px 0px 16px 0px #B8C3E6D9"}} cursor="pointer">
                            {taken ? "TAKEN" : "TAKE NOW"}
                        </Box>
                    </Center>
                </>
            :
                <Img w="100%" h="188px" src={src} borderRadius="16px"/>
        }
    </GridItem>
}

const PoolWarV0 = ({result, cards, takenCards, isOpen, connection} : {result: PoolWarV0Event['result'], cards: PoolWarV0Event['cards'], takenCards: PoolWarV0Event['takenCards'],isOpen: boolean,connection: Connection}) => {
    const size = useWindowSize();
    const [load, setLoad] = useState<boolean>(false);
    const [NFTs, setNFTs] = useState([]);
    useEffect(() => {
        async function load() {
            setLoad(false);
            let newNFTs = [];
            for (const nft of cards) {
                console.log(nft)
                const nftSrc = (await getMetadataByMintAddress(nft, connection)).src;
                if (takenCards.find((takenNFT) => takenNFT === nft))
                    newNFTs.push(<NFT src={nftSrc} mint={nft} result={result} taken={true}/>)
                else
                    newNFTs.push(<NFT src={nftSrc} mint={nft} result={result} taken={false}/>)
            }
            setNFTs(newNFTs);
            setLoad(true);
        }
        load();
    }, [isOpen]);

    const templateColumns = useMemo(() => {
        if (size.width < 600) return 'repeat(1, 1fr)';
        else if (size.width < 1112) return 'repeat(2, 1fr)';
        else return 'repeat(3, 1fr)';
    }, [size.width]);

    return <ModalContent maxW="80%" backgroundColor="inherit">
        <Center>
            <ElderKattsBox pt="56px" pl={size.width < 624 ? "24px" : "106px"} pr={size.width < 624 ? "24px" : "106px"} pb="75px" w="100%">
                <Text mb="48px" fontFamily="Njord" fontWeight="400" fontSize={size.width < 660 ? "28px" : "48px"}
                      lineHeight={size.width < 660 ? "34px" : "50px"} textAlign="center">
                    {result === 0 ? "YOU WON!" : "YOU LOSE"}
                </Text>
                {
                    !load ?
                        <Flex alignItems="center" justifyContent="center">
                            <div className={styles.donut}/>
                        </Flex>
                        :
                        <Center>
                            <Grid templateColumns={templateColumns} columnGap="24px" rowGap="24px">
                                {NFTs}
                            </Grid>
                        </Center>
                }
            </ElderKattsBox>
        </Center>
    </ModalContent>
}

const EventPanel = ({id, event, connection} : {id : string, event: Event, connection: Connection}) => {
    const size = useWindowSize();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const eventDescription = useMemo<string>(() => {
        if (isPoolWarV0Event(event))
            if (event.result === 0)
                return "WIN"
            else return "LOSE";
        else
            if (isSwapEvent(event))
                return `SWAP ${event.inputCards.length} CARDS TO 1`
            else
                return "EVENT";
    }, []);

    const dateString = useMemo(() => {

        const date = new Date(event.date);
        const [hour, minute] = date.toLocaleTimeString().split(':');
        const [day, month] = [date.getDate().toString().padStart(2, '0'), (date.getMonth() + 1).toString().padStart(2, '0')];
        return `${day}/${month} ${hour}:${minute}`;
    }, [event.date])

    const defaultFontSize : string = useMemo(() => {
        if (size.width < 500) return "16px";
        else return "20px";
    }, [size.width]);

    const defaultBoxHeight : string = useMemo(() => {
        if (size.width < 500) return "56px";
        else return "80px";
    }, [size.width]);

    return <Box w="100%" h={defaultBoxHeight} backgroundColor="#202020" borderRadius="24px" boxShadow="0px 0px 2px 2px #B2B2B20D"
                _hover={{
                    boxShadow: "0px 0px 8px 8px #B2B2B226"
                }}
                onClick={onOpen}
                cursor="pointer">
        <HStack spacing="0">
            <Box pl={size.width < 500 ? "13px" : "27px"} mr={size.width < 500 ? "12px" : "26px"} fontWeight="600"
                 fontSize={defaultFontSize} lineHeight={defaultBoxHeight} color="#E8E3DD">{id}</Box>
            <Box pr={size.width < 500 ? "10px" : "29px"} h={size.width < 500 ? "34px" : "64px"} borderLeft="2px solid #E8E8E826" color="#E8E8E826"/>
            <Text pr={size.width < 500 ? "15px" : "29px"} fontWeight="600" fontSize={defaultFontSize} lineHeight={defaultBoxHeight} color="#71CFC3">{event.type.toUpperCase()}</Text>
            {
                size.width < 664 ?
                    <></>
                :
                    <>
                        <Box pl="32px" h="64px" borderLeft="2px solid #E8E8E826" color="#E8E8E826"/>
                        <Text fontWeight="600" fontSize={defaultFontSize} lineHeight={defaultBoxHeight} color="#E8E3DD">{eventDescription}</Text>
                    </>
            }
            <Spacer w="auto"/>
            <Text pl={size.width < 500 ? "0px" : "20px"} pr={size.width < 500 ? "20px" : "40px"} fontWeight="300" fontSize={defaultFontSize} lineHeight={defaultBoxHeight} color="#B2B2B2">{dateString}</Text>
        </HStack>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
                {
                    isSwapEvent(event) ?
                        <Swap inputCards={event.inputCards} outputCard={event.outputCard} isOpen={isOpen} connection={connection}/>
                    :
                        isPoolWarV0Event(event) ?
                            <PoolWarV0 result={event.result} cards={event.cards} takenCards={event.takenCards} isOpen={isOpen} connection={connection}/>
                        :
                            <></>
                }
        </Modal>
    </Box>
}

const ActivitiesPanel = ({eventsInfo, connection}) => {
    const [Events, setEvents] = useState([]);
    useEffect(() => {
        let newEvents = [];
        let id = eventsInfo.count;
        eventsInfo.events.forEach((item) => {
            newEvents.push(<EventPanel id={`#${id--}`} event={item} connection={connection}/>)
        });
        setEvents(newEvents);
    }, [eventsInfo]);

    return <VStack mt="18px" spacing="16px">
        {Events}
    </VStack>
}

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

    const profilePanelState = useProfilePanel();
    const { connection } = useConnection();
    const wallet = useWallet();
    const [load, setLoad] = useState<boolean>(false);
    const [version, setVersion] = useState<number>(0);
    const [NFTsStats, setStats] = useState<NFTStatWithMints[]>([]);
    const [eventsInfo, setEventsInfo] = useState<EventsWrapper>({count: 0, events: []});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [loadedAllActivities, setLoadedAllActivities] = useState<boolean>(false);

    useEffect(() => {
        async function load() {
            if (profilePanelState.currentPanelMode.type === "MyNFTs") {
                setLoad(_ => false);
                const stats = await parseCards(wallet.publicKey, connection, true);
                console.log(stats);
                setStats(_ => stats);
                setLoad(_ => true);
            } else {
                setLoad(_ => false);
                const events : EventsWrapper = await fetchEvents(walletAuthObj.authToken, pageNumber);
                if (events.count > 5 && pageNumber === 1) setPageNumber(pageNumber+1);
                else setLoadedAllActivities(true);
                console.log(events);
                setEventsInfo(_ => events);
                setLoad(_ => true);
            }
        }

        if (profilePanelState.currentPanelMode.type === "MyNFTs")
        {
            load()
        } else if (walletAuthObj.authToken) {
            load();
        } else {
            setEventsInfo({count: 0, events: []});
        }},
    [walletAuthObj.authToken, wallet.publicKey, version, profilePanelState.currentPanelModeId]);

    async function loadMoreActivitiesClick() {
        setLoad(_ => false);
        if (eventsInfo.count / (5 * pageNumber) < 1)
            setLoadedAllActivities(true);
        setPageNumber(pageNumber+1);
        const newEvents : EventsWrapper = await fetchEvents(walletAuthObj.authToken, pageNumber);
        console.log(newEvents);
        let events = eventsInfo.events;
        newEvents.events.forEach((item) => events.push(item));
        setEventsInfo({count: eventsInfo.count, events: events});
        setLoad(_ => true);
    }

    return <Layout>
        {!connected ?

            <Flex h={size.height - 64 + "px"} w={size.width} alignItems="center" justifyContent="center">Connect wallet
                to see your profile page.</Flex>
            :
            <Box mb={size.width < 1040 ? "50px" : "160px"} pt="5.5%" pl="6.6%" pr="6.6%" w="100%">
                <Stack direction={size.width > 1040 ? "row" : "column"}
                       spacing="72px" w="100%" maxW="1248px" margin="0 auto">
                    <Stack maxHeight="578px" pt="32px" pl="23px" pr="23px" pb="32px" as={ElderKattsBox}
                           direction={size.width > 1040 ? "column" : size.width > 630 ? "row" : "column"}
                           spacing={"32px"} justifyContent="space-between">
                        <Box>
                            <Center mb="16px"><Image src={userPic}/></Center>
                            <Center>
                                <Box mb="8px" pt="9px" pb="9px" h="40px" w="200px" backgroundColor="#313131" color="#71CFC3"
                                     borderRadius="16px"
                                     fontWeight="300" fontSize="20px" lineHeight="24px" textAlign="center">
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
                                 hidden={size.width > 1040 ? false : size.width > 630}/>
                        <Box marginLeft="auto">
                            <Text mb="32px" fontFamily="Njord" fontWeight="400" fontSize="24px" lineHeight="28px"
                                  textAlign="center">
                                Connected <br/>Accounts
                            </Text>
                            <VStack>
                                <Box className={styles.socialButton}
                                     onClick={onDiscordButtonClick}
                                     onMouseEnter={onDiscordButtonEnter}
                                     onMouseLeave={onDiscordButtonLeave}
                                     cursor="pointer">
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
                                <Box className={styles.socialButton} onClick={onFakeClick} cursor="pointer">
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
                        <HStack mb="16px" direction="row" justifyContent={size.width > 1040 ? "" : "center"}>
                            {profilePanelState.panelMods.map((mod, id) => {
                                return <Box key={id} className={clsx(styles.panelButton,
                                    id == profilePanelState.currentPanelModeId ? styles.panelButton_clicked : null)} onClick={() => {
                                    profilePanelState.setCurrentPanelModeId(id)
                                }}>{mod.type}</Box>
                            })}
                        </HStack>

                        <Divider mt="32px" mb="20px" borderColor="#E8E8E826" border="0.5px"/>

                        {!load ?
                            <Flex mt="200px" alignItems="center" justifyContent="center">
                                <div className={styles.donut}/>
                            </Flex>
                        : profilePanelState.currentPanelMode.type === "MyNFTs" ?
                            <MyNFts NFTsStats={NFTsStats}/>
                            :
                            walletAuthObj.isSigned ?
                                <Box>
                                    <ActivitiesPanel eventsInfo={eventsInfo} connection={connection}/>
                                    {
                                        !loadedAllActivities ?
                                            <Center>
                                                <Box mt="48px" onClick={loadMoreActivitiesClick}>
                                                    <Img src="/swap-transition.svg" transform="rotate(90deg)"/>
                                                </Box>
                                            </Center>
                                        :
                                            <></>
                                    }
                                </Box>
                            :
                                <Flex alignItems="center" justifyContent="center" alignContent="center" verticalAlign="center">
                                    <Box fontWeight="400" fontSize={size.width > 768 ? "48px" : "32px"} lineHeight={size.width < 1048 ? "50px" : "450px"} color="#E8E3DD" textAlign="center">Sign in to see your activities</Box>
                                </Flex>
                        }

                    </Box>
                </Stack>
            </Box>
            }
    </Layout>;
}