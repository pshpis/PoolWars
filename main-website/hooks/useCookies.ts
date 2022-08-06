import {useEffect, useState} from "react";
import Cookies from 'js-cookie'

export function useCookies() {
    const secretPhrase = "f4y4hANN0wOPYCaQbi6Pp4cpDkCxR2";
    const [verify, setVerify] = useState(false);

    useEffect(() => {
        if (Cookies.get("secretPhrase") == secretPhrase)
            setVerify(true);
    },[])

    return {
        verify,
        setVerify,
        secretPhrase,
    }
}