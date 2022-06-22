import {useWindowSize} from "../../../../hooks/useWindowSize";
import {FirstSpot} from "./FirstSpot";
import {SecondSpot} from "./SecondSpot";
import {ThirdSpot} from "./ThirdSpot";
import {useEffect, useState} from "react";
import {FourthSpot} from "./FourthSpot";

export const AllSpots = () => {
    const [documentHeight, setDocumentHeight] = useState(0);
    useEffect(() => {
        if (typeof window !== "undefined"){
            setDocumentHeight(document.documentElement.offsetHeight);
        }
    })
    return <>
        <FirstSpot top="250px"/>
        {documentHeight > 2000? <SecondSpot top="1450px"/> : ""}
        {documentHeight > 2500? <ThirdSpot top="2150px"/> : ""}
        {documentHeight > 3500? <FourthSpot top="3000px"/> : ""}
        {documentHeight > 4500? <SecondSpot top="4000px"/> : ""}
        {documentHeight > 5000? <ThirdSpot top="4600px"/> : ""}
        {documentHeight > 6000? <FourthSpot top="5500px"/> : ""}
    </>
}