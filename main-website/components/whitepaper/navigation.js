import {General} from "./content-blocks/General";
import {GameFi} from "./content-blocks/GameFi";
import {Roadmap} from "./content-blocks/Roadmap";
import {Governance} from "./content-blocks/Governance";
import {Links} from "./content-blocks/Links";

export const sections = ["General", "GameFi", "Roadmap", "Governance", "Links"];

export const getContent = (section) => {
    switch (section){
        case "General":
            return <General/>
        case "GameFi":
            return <GameFi/>
        case "Roadmap":
            return <Roadmap/>
        case "Governance":
            return <Governance/>
        case "Links":
            return <Links/>
    }
}