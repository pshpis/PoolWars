import {FirstSpot} from "./FirstSpot";
import {Background} from "./Background";
import {useEffect, useState} from "react";
import {useWindowSize} from "../../../../hooks/useWindowSize";

export const AllSpots = () => {
    const [documentHeight, setDocumentHeight] = useState(0);
    useEffect(() => {
        if (typeof window !== "undefined"){
            setDocumentHeight(document.documentElement.offsetHeight);
        }
    })
    const size = useWindowSize();
    return <>
        <Background top="0px"/>
        <FirstSpot top="750px" width={size.width}/>
    </>
}