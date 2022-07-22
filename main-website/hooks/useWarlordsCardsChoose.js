import {useEffect, useState} from "react";

export function useWarlordsCardsChoose() {
    const [chooseArr, setChooseArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const getSumPoints = () => {
        const nftCoasts = [1, 3, 6];
        let newTotalPoints = 0;
        for (let i = 0; i < chooseArr.length; i ++) {
            newTotalPoints += chooseArr[i] * nftCoasts[i % 3];
        }
        return newTotalPoints;
    }

    return [chooseArr, setChooseArr, getSumPoints]
}