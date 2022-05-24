import {useAddress, useChainId, useDisconnect, useMetamask, useNetwork} from "@thirdweb-dev/react";
import meta from "../styles/meta.module.css";
import {useToast} from "@chakra-ui/react";
import {useEffect} from "react";

const PolygonChainId = 137;
export const MetaMaskButton = () => {
    const connectWithMetamask = useMetamask();
    const disconnectWithMetamask = useDisconnect();
    const address = useAddress();
    const chainId = useChainId();
    const toast = useToast();

    useEffect(() => {
        if (chainId && chainId !== PolygonChainId)
            handleWrongChanel();
    }, [chainId]);

    const handleWrongChanel = () => {
        const id = "wrongChainErrorToast";
        if (!toast.isActive(id))
            toast({
                id,
                title: "Switch to Polygon Mainnet",
                status: "error",
                isClosable: "true",
                position: "top",
            });
    }
    return (
        <div>
            {address ? (
                <button
                    id={meta.MetamaskLogin}
                    className={`${meta.button} ${meta.button_primary}  ${meta.button_medium} ${meta.button_outline}`}
                    onClick={disconnectWithMetamask}
                >
                    <span className={meta.button__user_name}>{address} </span>
                </button>
            ) : (
                <button
                    id={meta.MetamaskConnect}
                    className={`${meta.button} ${meta.button_primary}  ${meta.button_medium} ${meta.button_outline}`}
                    onClick={connectWithMetamask}
                >
                    <span>Connect MetaMask</span>
                </button>
            )}
        </div>
    );
};
