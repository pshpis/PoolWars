import {useState} from "react";
import {getContent, sections} from "./navigation";
import {Layout} from "./layout/Layout";
import {NavigationPanel} from "./NavigationPanel";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export const WhitePaper = () => {
    let [currentSection, setCurrentSection] = useState(sections[0]);
    let content = getContent(currentSection);

    return <Layout currentSection={currentSection} setCurrentSection={setCurrentSection}>
        {content}
        <NavigationPanel currentSection={currentSection} setCurrentSection={setCurrentSection}/>
    </Layout>
}