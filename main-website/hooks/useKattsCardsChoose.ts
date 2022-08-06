import {useCallback, useState} from "react";
import { ChooseNode, ChooseState } from "../lib/shared";

export function useKattsCardsChoose(): ChooseState {
    const [chooseArr, _setChooseArr] = useState<ChooseNode[]>([{ id : "attack_1", value: 0, points: 1},
        { id : "defence_1", value: 0, points: 1},
        { id : "intelligence_1", value: 0, points: 1},
        { id : "attack_3", value: 0, points: 3},
        { id : "defence_3", value: 0, points: 3},
        { id : "intelligence_3", value: 0, points: 3},
        { id : "attack_6", value: 0, points: 6},
        { id : "defence_6", value: 0, points: 6},
        { id : "intelligence_6", value: 0, points: 6},
        { id : "attack_12", value: 0, points: 12},
        { id : "defence_12", value: 0, points: 12},
        { id : "intelligence_12", value: 0, points: 12}]);

    const [sumPoints, setSumPoints] = useState<number>(0)

    const setChooseArr = useCallback((id, value) => {
        const newChooseArr = [...chooseArr];
        newChooseArr.find(item => item.id == id).value = value;
        let newSumPoints = 0;
        newChooseArr.forEach((el) => {
           newSumPoints +=  el.value * el.points;
        });
        setSumPoints(newSumPoints);
        _setChooseArr(newChooseArr);
    }, [chooseArr, _setChooseArr]);

    return {
        chooseArr,
        sumPoints,
        setChooseArr,
    }
}