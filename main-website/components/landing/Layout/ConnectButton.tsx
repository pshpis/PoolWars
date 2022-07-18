import {Button} from "@chakra-ui/react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {useWallet} from "@solana/wallet-adapter-react";
import {useMemo} from "react";
import styles from '../../../styles/walletButton.module.css'

const ConnectButton = ({onClick}) => {
    const { publicKey, connected, connecting } = useWallet();
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const walletButtonContent = useMemo(() => {
        if (!connected) return "Select Wallet";
        if (connecting) return "Connecting...";
        return base58.slice(0, 5) + '...' + base58.slice(-5);
    }, [connected, connecting]);
    // @ts-ignore
    return <WalletMultiButton className={styles.walletMultiButton} startIcon={null}>
        <Button
            height="40px"
            width="188px"
            background="#202020"
            color="#71CFC3"
            border="2px"
            borderRadius="16px"
            fontSize="16px"
            fontWeight="300"
            onClick={onClick}
            _hover={{
                background: "#71CFC3",
                color: "#202020",
                border: "2px solid #71CFC3",
            }}>
            {walletButtonContent}
        </Button>
    </WalletMultiButton>;
}

export default ConnectButton;