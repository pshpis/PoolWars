import {useEffect, useState} from "react";
import Cookies from 'js-cookie'

export function useCookies() {
    const secretPhrases = ["f4y4hANN0wOPYCaQbi6Pp4cpDkCxR2",
                           "IcbF3lMurMGxs1C2C1CD3hJKAIO583",];

    const [verify, setVerify] = useState(false);

    useEffect(() => {
        if (secretPhrases.find((item) => item === Cookies.get("secretPhrase")))
            setVerify(true);
    },[])

    return {
        verify,
        setVerify,
        secretPhrases,
    }
}