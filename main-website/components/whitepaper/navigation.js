import {General} from "./content-blocks/General";
import {Roadmap} from "./content-blocks/Roadmap";
import {Governance} from "./content-blocks/Governance";
import {Links} from "./content-blocks/Links";
import {PoolWars} from "./content-blocks/PoolWars";
import {Staking} from "./content-blocks/Staking";
import {CombatCards} from "./content-blocks/CombatCardsAndSwaps";

export const sections = ["General", "Staking", "Pool Wars", "Combat cards and Swaps", "Governance", "Roadmap",  "Links"];

export const getContent = (section) => {
    if (section === "") return <></>;
    switch (section){
        case "General":
            return <General/>
        case "Staking":
            return <Staking/>
        case "Pool Wars":
            return <PoolWars/>
        case "Combat cards and Swaps":
            return <CombatCards/>
        case "Roadmap":
            return <Roadmap/>
        case "Governance":
            return <Governance/>
        case "Links":
            return <Links/>
    }
}

export const getSectionPathName = (section) => {
    if (section === "") return section;
    switch (section){
        case "General":
            return "general"
        case "Staking":
            return "staking"
        case "Pool Wars":
            return "pool-wars"
        case "Combat cards and Swaps":
            return "combat-cards-swaps"
        case "Roadmap":
            return "roadmap"
        case "Governance":
            return "governance"
        case "Links":
            return "links"
    }
}

export const getSectionBySectionPathName = (sectionPathName) => {
    if (sectionPathName === "") return "";
    switch (sectionPathName){
        case "general":
            return "General"
        case "staking":
            return "Staking"
        case "pool-wars":
            return "Pool Wars"
        case "combat-cards-swaps":
            return "Combat cards and Swaps"
        case "roadmap":
            return "Roadmap"
        case "governance":
            return "Governance"
        case "links":
            return "Links"
    }
    return undefined;
}