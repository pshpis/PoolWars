import useLocalStorageState from "use-local-storage-state";
import {useCallback, useEffect, useMemo, useState} from "react";
import {User} from "@prisma/client";
import bs58 from "bs58";
import {useWallet} from "@solana/wallet-adapter-react";

export const useWalletAuth = () => {
    const {publicKey, signMessage} = useWallet();
    const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const walletAddressView = useMemo(() => {
        return walletAddress?.slice(0, 5) + '...' + walletAddress?.slice(-5);
    }, [walletAddress]);

    const [authToken, setAuthToken] = useLocalStorageState("auth_token", {defaultValue: ""});
    const [authTokenExpireAt, setAuthTokenExpireAt] = useLocalStorageState("auth_token_expire_at", {defaultValue: -1});

    const [user, setUser] = useState<User | null>(null);
    const isSigned = useMemo(() => user !== null, [user]);
    useEffect(() => {
        const updateData = async () => {
            if (authToken === "" || authTokenExpireAt < Date.now()){
                await setUser(null);
                return;
            }
            const userReq = await fetch("/api/auth/getUser?auth_token=" + authToken);
            const userRes = await userReq.json();
            if (userRes.error !== undefined){
                await setUser(null);
            }
            else {
                setUser(userRes);
            }

        }

        updateData();
    }, [authToken, authTokenExpireAt]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const onSignIn = useCallback(async () => {
        const messageTextReq = await fetch("/api/auth/getMessage?wallet_address="+walletAddress);
        const messageTextRes = await messageTextReq.json();
        const messageText = messageTextRes.text;

        const message = new TextEncoder().encode(messageText);
        try {
            const signature = bs58.encode(await signMessage(message));

            const authTokenReq = await fetch(`/api/auth/getToken?wallet_address=${walletAddress}&signature=${signature}`);
            const authTokenRes = await authTokenReq.json();
            if (authTokenRes.error !== undefined){
                throw new Error(authTokenRes.error);
            }

            await setAuthToken(authTokenRes.token)
            await setAuthTokenExpireAt(authTokenRes.time + Date.now());
            console.log(authTokenRes);
            console.log(authToken);
        }
        catch (err) {
            console.log(err.message);
        }
    }, [publicKey, signMessage]);

    const onSignOut = useCallback( async () => {
        setAuthToken("");
        setAuthTokenExpireAt(-1);
    }, [setAuthToken, setAuthTokenExpireAt]);

    const onSignToggle = useCallback(async () => {
        if (isSigned) await onSignOut();
        else await onSignIn();
    }, [isSigned, onSignIn, onSignOut]);

    return {
        walletAddress,
        walletAddressView,
        user,
        onSignIn,
        onSignOut,
        onSignToggle,
        isSigned,
    }
}