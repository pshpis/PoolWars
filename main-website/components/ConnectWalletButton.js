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
import { Text } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import {useState} from "react";
import { useToast } from '@chakra-ui/react'

function cutAddress(address){
    return address.slice(0, 5) + "..." + address.slice(address.length - 4);
}

const PolygonChainId = 137;
export const ConnectWalletButton = () => {
    const connectWithCoinbaseWallet = useCoinbaseWallet();
    const connectWithMetamask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();
    const disconnectWallet = useDisconnect();
    const address = useAddress();
    const network = useNetwork();

    
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isHover, setIsHover] = useState(false);

    const toast = useToast();

    if (address) {
        let modal = "";
        if (network[0].data.chain.id !== PolygonChainId){
            modal =
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader><Text align="center">Change your network</Text></ModalHeader>
                    <ModalBody>
                        <Text>
                            All our services work on polygon <br/>
                            Please switch your network to <b>Polygon Mainnet</b>
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' onClick={onClose}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        }
        return (
            <>
                {modal}
                <Button width="200px" onClick = {event => { disconnectWallet(); onClose();}}
                        leftIcon={<Icon as={MdOutlineAccountBalanceWallet} w="6" h="6"/>}
                        colorScheme='red' variant={isHover? 'solid':'outline'}S
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                    { isHover ? "Disconnect wallet" : cutAddress(address)}
                </Button>
            </>
        );
    }

    return (
        <>
            <Button width="200px" onClick={() => { onOpen(); }}
                    leftIcon={<Icon as={MdOutlineAccountBalanceWallet} w="6" h="6"/>}
                    colorScheme='red' variant='outline'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                Connect Wallet
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader><Text align="center">Connect your wallet</Text></ModalHeader>
                    <ModalBody>
                        <SimpleGrid column={1} spacing={5}>
                            <Button onClick={() => connectWithMetamask()}>
                                Connect MetaMask
                            </Button>
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