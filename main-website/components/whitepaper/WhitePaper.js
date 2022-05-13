import {useEffect, useState} from "react";
import {getContent, getSectionBySectionPathName} from "./navigation";
import {Layout} from "./layout/Layout";
import {NavigationPanel} from "./NavigationPanel";
import {useRouter} from "next/router";

export const WhitePaper = () => {
    let [currentSection, setCurrentSection] = useState("");

    const {query, isReady} = useRouter();
    useEffect(() => {
        if (isReady){
            const {section} = query;
            let sectionName = getSectionBySectionPathName(section);
            setCurrentSection(sectionName);
        }
    }, [isReady]);


    let content = getContent(currentSection);

    return <Layout currentSection={currentSection} setCurrentSection={setCurrentSection}>
        {content}
        <NavigationPanel currentSection={currentSection} setCurrentSection={setCurrentSection}/>
    </Layout>;
}