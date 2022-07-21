import {useWalletAuth} from "./useWalletAuth";
import {useToast} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";

export const useSocialConnect = (walletAuthObj) => {
    const {user, updateUser, isSigned, authToken, checkedFetch, isUserLoaded} = walletAuthObj;

    const toast = useToast();
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
            window.location.href = "https://discord.com/api/oauth2/authorize?client_id=994958393188028496&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile&response_type=token&scope=identify%20guilds%20guilds.members.read";
        }
        // else {
        //     checkedFetch(`/api/social/discord/updateAuthToken?authToken=${authToken}&discord_auth_token=`, {method: "POST"}).then(updateUser);
        // }
    }, [isSigned, user?.discord_auth_token, toast, user]);

    useEffect(() => {
        console.log(user);
    }, [user])


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

    const fetchDiscordData = useCallback(async (accessToken, tokenType) => {
        console.log(authToken);
        console.log(user?.auth_token)
        console.log(user);
        console.log(accessToken);
        console.log(tokenType);

        await fetch(`/api/social/discord/updateAuthToken?authToken=${authToken}&discord_auth_token=${accessToken}`, {method: "POST"});
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
    }
}