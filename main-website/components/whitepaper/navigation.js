import {General} from "./content-blocks/General";
import {Roadmap} from "./content-blocks/Roadmap";
import {Governance} from "./content-blocks/Governance";
import {Links} from "./content-blocks/Links";
import {PoolWars} from "./content-blocks/PoolWars";
import {Staking} from "./content-blocks/Staking";
import {WarlordsCards} from "./content-blocks/Warlords cards and NFT Swaps";

export const sections = ["General", "Staking", "Pool Wars", "Warlords cards and NFT Swaps", "Governance", "Roadmap",  "Links"];

export const getContent = (section) => {
    if (section === "") return <></>;
    switch (section){
        case "General":
            return <General/>
        case "Staking":
            return <Staking/>
        case "Pool Wars":
            return <PoolWars/>
        case "Warlords cards and NFT Swaps":
            return <WarlordsCards/>
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
        case "Warlords cards and NFT Swaps":
            return "warlords-cards"
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
        case "warlords-cards":
            return "Warlords cards and NFT Swaps"
        case "roadmap":
            return "Roadmap"
        case "governance":
            return "Governance"
        case "links":
            return "Links"
    }
    return undefined;
}