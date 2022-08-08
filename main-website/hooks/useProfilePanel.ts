import {useMemo, useState} from "react";

interface PanelMode {
    type: "MyNFTs" | "Activities"
}

interface ProfilePanel {
    panelMods: PanelMode[],
    currentPanelModeId: number,
    currentPanelMode: PanelMode,
    setCurrentPanelModeId: (number) => void
}

export function useProfilePanel() : ProfilePanel {
    const panelMods: PanelMode[] = useMemo(() => [
        {type: "MyNFTs"},
        {type: "Activities"},
    ],[]);

    const [currentPanelModeId, setCurrentPanelModeId] = useState<number>(0);
    const currentPanelMode = useMemo<PanelMode>(() => {
        return panelMods[currentPanelModeId];
    }, [currentPanelModeId, panelMods])

    return {
        panelMods,
        currentPanelModeId,
        currentPanelMode,
        setCurrentPanelModeId,
    }
}