import {useState} from "react";
import {getContent, getSectionBySectionPathName} from "./navigation";
import {Layout} from "./layout/Layout";
import {NavigationPanel} from "./NavigationPanel";

export const WhitePaper = ({defaultSection}) => {
    let [currentSection, setCurrentSection] = useState(defaultSection);

    let content = getContent(currentSection);

    return <Layout currentSection={currentSection} setCurrentSection={setCurrentSection}>
        {content}
        <NavigationPanel currentSection={currentSection} setCurrentSection={setCurrentSection}/>
    </Layout>;
}