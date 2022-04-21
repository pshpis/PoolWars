import {General} from "./content-blocks/General";
import {Roadmap} from "./content-blocks/Roadmap";
import {Governance} from "./content-blocks/Governance";
import {Links} from "./content-blocks/Links";
import {PoolWars} from "./content-blocks/PoolWars";

export const sections = ["General", "Pool Wars", "Roadmap", "Governance", "Links"];

export const getContent = (section) => {
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