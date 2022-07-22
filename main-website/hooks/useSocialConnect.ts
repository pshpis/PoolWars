import {useWalletAuth} from "./useWalletAuth";
import {useToast} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";

export const useSocialConnect = (walletAuthObj) => {
    const {user, updateUser, isSigned, authToken, checkedFetch, isUserLoaded} = walletAuthObj;

    const toast = useToast();
    const generateDiscordConnectionUri = useCallback(() => {
        let redirectUri = window.location.href;
        redirectUri = redirectUri.split('#')[0];
        redirectUri.replace(':', '%3A')
        redirectUri.replace('/', '%2F');
        return `https://discord.com/api/oauth2/authorize?client_id=994958393188028496&redirect_uri=${redirectUri}&response_type=token&scope=identify%20guilds%20guilds.members.read`;
    }, []);
    const onDiscordButtonClick = useCallback(() => {
        if (!isSigned) {
            toast({
                title: 'Please sign in before connecting discord',
                status: 'info',
                position: 'top',
                isClosable: true,
            });
            return;
        }
        if (user.discord_auth_token === "" || user.discord_auth_token === "null") {
            window.location.href = generateDiscordConnectionUri();
        }
        else {
            checkedFetch(`/api/social/discord/updateAuthToken?auth_token=${authToken}&discord_auth_token=`, {method: "POST"}).then(updateUser);
        }
    }, [isSigned, user?.discord_auth_token, toast, user, checkedFetch, authToken]);

    const [discordButtonText, setDiscordButtonText] = useState('Connect');
    useEffect(() => {
        const updateDiscordButtonText = async () => {
            if (isSigned && user) {
                if (user.discord_auth_token !== "null" && user.discord_auth_token) {
                    console.log(user.discord_auth_token);
                    const userReq = await fetch("https://discord.com/api/users/@me", {
                        headers: {
                            authorization: `Bearer ${user.discord_auth_token}`,
                        }
                    });
                    await userReq.json().then(response => {
                        let {username, discriminator} = response;
                        console.log(`${username}#${discriminator}`);
                        if (username.length > 7)
                            username = username.slice(0, 2) + '...' + username.slice(-2);
                        setDiscordButtonText(`${username}#${discriminator}`);
                    });
                }
                else {
                    setDiscordButtonText("Connect");
                }
            }
            else {
                setDiscordButtonText("Connect");
            }
        }
        updateDiscordButtonText();
    }, [isSigned, user, user?.discord_auth_token]);

    const [discordButtonBuffer, setDiscordButtonBuffer] = useState("");
    const onDiscordButtonEnter = useCallback(() => {
        if (discordButtonText === 'Connect') return;
        setDiscordButtonBuffer(discordButtonText);
        setDiscordButtonText('Disconnect');
    }, [discordButtonText]);

    const onDiscordButtonLeave = useCallback(() => {
        if (discordButtonText !== 'Disconnect') return;
        setDiscordButtonText(discordButtonBuffer);
    }, [discordButtonBuffer, discordButtonText])

    const fetchDiscordData = useCallback(async (accessToken, tokenType) => {
        await checkedFetch(`/api/social/discord/updateAuthToken?auth_token=${authToken}&discord_auth_token=${accessToken}`, {method: "POST"});
        await updateUser();
    }, [authToken, updateUser, user]);

    const addDiscord = useCallback(async () => {
        console.log(isUserLoaded);
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        if (accessToken && tokenType){
            await fetchDiscordData(accessToken, tokenType);
        }
    }, [fetchDiscordData, isUserLoaded, authToken, updateUser, user])

    useEffect(() => {
       if (isUserLoaded) addDiscord();
    }, [isUserLoaded]);

    return {
        discordButtonText,
        onDiscordButtonClick,
        onDiscordButtonEnter,
        onDiscordButtonLeave,
    }
}