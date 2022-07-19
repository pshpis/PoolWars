import {FirstSpot} from "./FirstSpot";
import {useWindowSize} from "../../../../hooks/useWindowSize";

const AllSpots = () => {
    const size = useWindowSize();
    return <>
        <FirstSpot top="750px" width={size.width}/>
    </>
}

export default AllSpots;