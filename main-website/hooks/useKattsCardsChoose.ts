import {useMemo, useState} from "react";

export function useKattsCardsChoose() {
    const [chooseArr, setChooseArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const getSumPoints = () => {
        const nftCoasts = [1, 3, 6];
        let newTotalPoints = 0;
        for (let i = 0; i < chooseArr.length; i ++) {
            newTotalPoints += chooseArr[i] * nftCoasts[i % 3];
        }
        return newTotalPoints;
    }

    const numberOfCards = useMemo(() => {
        let numberOfCards = 0;
        for (let i = 0; i < chooseArr.length; i ++) {
            numberOfCards += chooseArr[i];
        }
        return numberOfCards;
    }, []);

    const sumPoints = useMemo(() => {
        return 0;
    }, []);

    const willTakePoints = useMemo(() => {
        return 0;
    }, []);


    // const get

    return {
        chooseArr,
        numberOfCards,
        sumPoints,
        willTakePoints,
        setChooseArr,
        getSumPoints
    }
}