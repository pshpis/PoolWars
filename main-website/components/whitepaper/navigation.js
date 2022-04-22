import {General} from "./content-blocks/General";
import {Roadmap} from "./content-blocks/Roadmap";
import {Governance} from "./content-blocks/Governance";
import {Links} from "./content-blocks/Links";
import {PoolWars} from "./content-blocks/PoolWars";

export const sections = ["General", "Pool Wars", "Roadmap", "Governance", "Links"];

export const getContent = (section) => {
    if (section === "") return <></>;
    switch (section){
        case "General":
            return <General/>
        case "Pool Wars":
            return <PoolWars/>
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
        case "Pool Wars":
            return "pool-wars"
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
        case "pool-wars":
            return "Pool Wars"
        case "roadmap":
            return "Roadmap"
        case "governance":
            return "Governance"
        case "links":
            return "Links"
    }
    return undefined;
}