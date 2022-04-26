import {useEffect, useState} from "react";
import {getContent, getSectionBySectionPathName, sections} from "./navigation";
import {Layout} from "./layout/Layout";
import {NavigationPanel} from "./NavigationPanel";
import {useRouter} from "next/router";

export const WhitePaper = () => {
    let [currentSection, setCurrentSection] = useState("");

    const router = useRouter();
    useEffect(() => {
        if (router.isReady){
            const {section} = router.query;
            let sectionName = getSectionBySectionPathName(section);
            setCurrentSection(sectionName);
        }
    }, [router.isReady])


    let content = getContent(currentSection);

    return <Layout currentSection={currentSection} setCurrentSection={setCurrentSection}>
        {content}
        <NavigationPanel currentSection={currentSection} setCurrentSection={setCurrentSection}/>
    </Layout>;
}