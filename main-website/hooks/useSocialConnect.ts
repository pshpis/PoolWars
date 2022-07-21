import {useWalletAuth} from "./useWalletAuth";
import {useToast} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";

export const useSocialConnect = () => {
    const {user, updateUser, isSigned, authToken, checkedFetch} = useWalletAuth();

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
        else {
            checkedFetch(`/api/social/discord/updateAuthToken?authToken=${authToken}&discord_auth_token=`, {method: "POST"}).then(updateUser);
        }
    }, [user, isSigned]);


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
    }, [isSigned, user?.discord_auth_token]);

    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
        const fetchData = async () => {
            console.log(authToken);
            console.log(accessToken);
            console.log(tokenType);
            await checkedFetch(`/api/social/discord/updateAuthToken?authToken=${authToken}&discord_auth_token=${accessToken}`, {method: "POST"});
            await updateUser();
        }

        if (accessToken && tokenType) fetchData();
    }, []);

    return {
        discordButtonText,
        onDiscordButtonClick,
    }
}