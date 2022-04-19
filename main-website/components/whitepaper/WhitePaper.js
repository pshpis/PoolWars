import {useState} from "react";
import {getContent, sections} from "./navigation";
import {Layout} from "./layout/Layout";

export const WhitePaper = () => {
    let [currentSection, setCurrentSection] = useState(sections[0]);
    let content = getContent(currentSection);

    return <Layout currentSection={currentSection} setCurrentSection={setCurrentSection}>{content}</Layout>
}