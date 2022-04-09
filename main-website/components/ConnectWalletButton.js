import {
    useMetamask,
    useWalletConnect,
    useCoinbaseWallet,
    useNetwork,
    useAddress,
    useDisconnect,
} from '@thirdweb-dev/react';


import {useDisclosure} from "@chakra-ui/react";
import {Button, ButtonGroup} from "@chakra-ui/react";
import {MdOutlineAccountBalanceWallet} from 'react-icons/md';
import { Icon, createIcon } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'


export const ConnectWalletButton = () => {
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const connectWithMetamask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();
    const disconnectWallet = useDisconnect();
    const address = useAddress();
    const network = useNetwork();
    
    const {isOpen, onOpen, onClose} = useDisclosure();

    if (address) {
        return (
            <>
                Address: {address}
                <br />
                Chain ID: {network[0].data.chain && network[0].data.chain.id}
                <br />
                <Button onClick={disconnectWallet}>Disconnect</Button>
            </>
        );
    }

    return(
        <>
            <Button onClick={onOpen} leftIcon={<Icon as={MdOutlineAccountBalanceWallet} w="6" h="6"/>} colorScheme='red' variant='outline'>
                Connect Wallet
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader><Text align="center">Connect your wallet</Text></ModalHeader>
                    <ModalBody>
                        <SimpleGrid column={1} spacing={5}>
                            <Button onClick={() => connectWithMetamask()}>Connect MetaMask</Button>
                            <Button onClick={() => connectWithWalletConnect()}>
                                Connect WalletConnect
                            </Button>
                            <Button onClick={() => connectWithCoinbaseWallet()}>
                                Connect Coinbase Wallet
                            </Button>
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}