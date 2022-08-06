import Layout from "../Layout/Layout";
import {Box, Center, HStack, Img, Text, VStack} from "@chakra-ui/react";
import {useWindowSize} from "../../../hooks/useWindowSize";
import React, {useEffect, useMemo, useState} from "react";
import {NFTSPanel} from "../NFTsPanel";
import {useKattsCardsChoose} from "../../../hooks/useKattsCardsChoose";
import {ElderKattsBox} from "../Layout/ElderKattsBox";
import { NFTStatWithMints, parseCards } from "../../../lib/nft-helper";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getPoolStatus, getPoolWar, PoolState, PoolType, PoolWar } from "../../../lib/pool-wars";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { mapChooseStateToMints } from "../../../lib/shared";

const MainText = () => {
    const size = useWindowSize();
    return <Box maxWidth="508px">
        <Text fontFamily="Njord" fontWeight="400" fontSize={size.width > 696 ? "83px" : "42px"} lineHeight={size.width > 696 ? "95px" : "40px"} color="#E8E3DD" textAlign="center">Pool Wars</Text>
        <HStack>
            <Text fontFamily="Njord" fontWeight="400" fontSize={size.width > 696 ? "64px" : "32px"} lineHeight={size.width > 696 ? "73px" : "40px"} color="#E8E3DD">Event v0</Text>
            <Text fontFamily="Njord" fontWeight="400" fontSize={size.width > 696 ? "64px" : "32px"} lineHeight={size.width > 696 ? "73px" : "40px"} color="#71CFC3">Live!</Text>
        </HStack>
    </Box>
}

const EventTimerPanel = () => {
    const size = useWindowSize();
    return <Box pl="40px" pt="34px" width={size.width > 697 ? "508px" : "100%"} height="152px" backgroundColor="#313131" borderRadius="40px">
        <Text fontWeight="300" fontSize="24px" lineHeight="36px" color="#E8E3DD">This event will be finished in:</Text>
        <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#B8C3E6">19 days 14 hours 9 minutes 59 seconds</Text>
    </Box>
}

const AttackPoolPanel = ({sumPoints, totalInPool, userInPool, onClick}: { sumPoints: number, totalInPool: number, userInPool: number, onClick: React.MouseEventHandler<HTMLDivElement> }) => {
    return <ElderKattsBox zIndex={-2} width="294px" height="368px">
        <Text mt="32px" mb="32px" pl="36px"
              fontFamily="Njord" fontWeight="400" fontSize="32px" lineHeight="37px" color="#71CFC3">Attack Pool</Text>

        <HStack zIndex={0} paddingLeft="32px" paddingRight="32px" spacing="auto">
            <Text fontWeight="300" fontSize="20px" lineHeight="30px">Total points:</Text>
            <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3">{totalInPool}</Text>
        </HStack>
        <HStack zIndex={0} paddingLeft="32px" paddingRight="32px" spacing="auto">
            <Text fontWeight="300" fontSize="20px" lineHeight="30px">You choose points:</Text>
            <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3">{sumPoints}</Text>
        </HStack>
        <HStack zIndex={0} paddingLeft="32px" paddingRight="32px" spacing="auto">
            <Text fontWeight="300" fontSize="20px" lineHeight="30px">You provided points:</Text>
            <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3">{userInPool}</Text>
        </HStack>

        <Center zIndex={0} mt="81px">
            <Box onClick={onClick} width="246px" height="48px" backgroundColor="#B8C3E6" color="#202020" borderRadius="24px"
                 fontWeight="600" fontSize="22px" lineHeight="48px" textAlign="center">
                Provide your NFTs!
            </Box>
        </Center>

        <Img mt="-230px" position="absolute" zIndex={-1} src="/Sword.svg"/>
    </ElderKattsBox>
}

const DefencePoolPanel = ({sumPoints, totalInPool, userInPool, onClick}: { sumPoints: number, totalInPool: number, userInPool: number, onClick: React.MouseEventHandler<HTMLDivElement>}) => {
    return <ElderKattsBox zIndex={-2} width="294px" height="368px">
        <Text mt="32px" mb="32px" pl="36px"
              fontFamily="Njord" fontWeight="400" fontSize="32px" lineHeight="37px" color="#71CFC3">Defence Pool</Text>

        <HStack zIndex={0} paddingLeft="32px" paddingRight="32px" spacing="auto">
            <Text fontWeight="300" fontSize="20px" lineHeight="30px">Total points:</Text>
            <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3">{totalInPool}</Text>
        </HStack>
        <HStack zIndex={0} paddingLeft="32px" paddingRight="32px" spacing="auto">
            <Text fontWeight="300" fontSize="20px" lineHeight="30px">You choose points:</Text>
            <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3">{sumPoints}</Text>
        </HStack>
        <HStack zIndex={0} paddingLeft="32px" paddingRight="32px" spacing="auto">
            <Text fontWeight="300" fontSize="20px" lineHeight="30px">You provided points:</Text>
            <Text fontWeight="600" fontSize="24px" lineHeight="36px" color="#71CFC3">{userInPool}</Text>
        </HStack>

        <Center zIndex={0} mt="81px">
            <Box onClick={onClick} width="246px" height="48px" backgroundColor="#B8C3E6" color="#202020" borderRadius="24px"
                 fontWeight="600" fontSize="22px" lineHeight="48px" textAlign="center">
                Provide your NFTs!
            </Box>
        </Center>

        <Img mt="-233px" position="absolute" zIndex={-1} src="/Shield.svg"/>
    </ElderKattsBox>
}

export const PoolWars = () => {
    const size = useWindowSize();
    const wallet = useWallet();
    const { connection } = useConnection();

    const defaultPadding = useMemo(() => {
        if (size.width < 486) return 30;
        return 96;
    }, [size.width])

    const kattsCardChoose = useKattsCardsChoose();
    const {sumPoints, setChooseArr} = kattsCardChoose;

    const [version, setVersion] = useState<number>(0)
    const [NFTsStats, setStats] = useState<NFTStatWithMints[]>([])
    const versionInc = () => setVersion(v => v + 1);

    const [poolWar, setPoolWar] = useState<PoolWar | undefined>();

    const [attackPool, setAttackPool] = useState<PoolState>({
        address: '',
        totalStrength: 0,
        userStrength: 0
    })

    const [defencePool, setDefencePool] = useState<PoolState>({
        address: '',
        totalStrength: 0,
        userStrength: 0
    })

    useEffect(() => {

        async function load() {
            const stats = await parseCards(wallet.publicKey, connection);
            console.log(stats);
            setStats(_ => stats);
        }

        load()
    },
        [wallet.publicKey, version]);

    useEffect(() => {
        async function load() {
            console.log('Get Poolwar')
            const poolWar = await getPoolWar()

            if (poolWar) {
                setPoolWar(poolWar)
            }
        }

        load();
    },
        [])

    useEffect(() => {
        async function load() {

            if (!poolWar) {
                return;
            }

            const userAddress = wallet.publicKey;
            const pool1State = await getPoolStatus(poolWar.pools[0].address, userAddress)
            const pool2State = await getPoolStatus(poolWar.pools[1].address, userAddress)

            if (pool1State && pool2State) {
                setAttackPool(pool1State);
                setDefencePool(pool2State);
            }
        }

    }, [poolWar, wallet, version])

    async function provideNfts(poolType: PoolType) {

        let depositToPool: PublicKey | undefined;
        
        switch (poolType) {
            case 'attack':
                depositToPool = new PublicKey(attackPool.address)
                break;

            case 'defence':
                depositToPool = new PublicKey(defencePool.address)
                break;
        }

        const mints = mapChooseStateToMints(kattsCardChoose, NFTsStats);
        
    }

    return <Layout>
        <Box pt="80px" mb="160px" paddingLeft={defaultPadding+"px"} paddingRight={defaultPadding+"px"}>
            {size.width > 1352 ?
                <HStack spacing="auto" w="100%" maxWidth="1248px" margin="0 auto">
                    <VStack spacing="50px">
                        <MainText/>
                        <EventTimerPanel/>
                    </VStack>
                    <HStack spacing="24px">
                        <AttackPoolPanel onClick={() => provideNfts('attack')} sumPoints={sumPoints} totalInPool={attackPool.totalStrength} userInPool={attackPool.userStrength}/>
                        <DefencePoolPanel onClick={() => provideNfts('defence')} sumPoints={sumPoints} totalInPool={defencePool.totalStrength} userInPool={defencePool.userStrength} />
                    </HStack>
                </HStack>
            :
                <VStack spacing="40px">
                    <VStack spacing="50px">
                        <MainText/>
                        <EventTimerPanel/>
                    </VStack>
                    {size.width > 804 ?
                        <HStack spacing="24px">
                            <AttackPoolPanel onClick={() => provideNfts('attack')} sumPoints={sumPoints} totalInPool={attackPool.totalStrength} userInPool={attackPool.userStrength}/>
                            <DefencePoolPanel onClick={() => provideNfts('defence')} sumPoints={sumPoints} totalInPool={defencePool.totalStrength} userInPool={defencePool.userStrength} />
                        </HStack>
                        :
                        <VStack spacing="24px">
                            <AttackPoolPanel onClick={() => provideNfts('attack')} sumPoints={sumPoints} totalInPool={attackPool.totalStrength} userInPool={attackPool.userStrength}/>
                            <DefencePoolPanel onClick={() => provideNfts('defence')} sumPoints={sumPoints} totalInPool={defencePool.totalStrength} userInPool={defencePool.userStrength} />
                        </VStack>
                    }

                </VStack>
            }

            <NFTSPanel NFTsStats={NFTsStats} setChooseArr={setChooseArr}/>
        </Box>
    </Layout>
}