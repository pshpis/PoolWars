import {useEffect, useMemo, useState} from "react";

export function useKattsCardsChoose() {
    const [chooseArr, _setChooseArr] = useState([{ id : "attack_1", value: 0},
        { id : "defence_1", value: 0},
        { id : "intelligence_1", value: 0},
        { id : "attack_3", value: 0},
        { id : "defence_3", value: 0},
        { id : "intelligence_3", value: 0},
        { id : "attack_6", value: 0},
        { id : "defence_6", value: 0},
        { id : "intelligence_6", value: 0}]);

    const setChooseArr = (id, value) => {
        chooseArr.find(item => item.id == id).value = value;
        _setChooseArr(chooseArr);
    }

    const [willTakeCardPoints, setWillTakeCardPoints] = useState(0);


    const sumPoints = useMemo(() => {
        let sumPoints = 0;
        for (let i = 0; i < chooseArr.length; i ++) {
            sumPoints += chooseArr[i].value * +chooseArr[i].id.slice(-1);
        }
        return sumPoints;
    }, [chooseArr, _setChooseArr, setChooseArr]);

    const needPointsPerOne = useMemo(() => {
        return sumPoints % willTakeCardPoints;
    }, [chooseArr, _setChooseArr, setChooseArr, setWillTakeCardPoints]);


    // const get

    return {
        chooseArr,
        sumPoints,
        needPointsPerOne,
        setChooseArr,
        setWillTakeCardPoints
    }
}