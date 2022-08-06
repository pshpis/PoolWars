import {useMemo, useState} from "react";


export interface SwapMode{
    type: "rare" | "epic" | "legendary",
    needPoints: number,
    getPoints: number,
}

export interface SwapState{
    swapMods: SwapMode[],
    currentModId: number,
    currentMod: SwapMode,
    setCurrentModId: (number) => void
}

export function useKattsCardsSwaps() : SwapState {
    const swapMods: SwapMode[] = useMemo(() => [
        {type: "rare", needPoints: 3, getPoints: 3},
        {type: "epic", needPoints: 6, getPoints: 6},
        {type: "legendary", needPoints: 9, getPoints: 12},
    ], [])

    const [currentModId, setCurrentModId] = useState<number>(2)
    const currentMod = useMemo<SwapMode>(() => {
        return swapMods[currentModId];
    }, [currentModId, swapMods])

    return {
        swapMods,
        currentModId,
        currentMod,
        setCurrentModId,
    }
}