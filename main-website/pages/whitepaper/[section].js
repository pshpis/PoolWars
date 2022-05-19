import {WhitePaper} from "../../components/whitepaper/WhitePaper";
import {getSectionBySectionPathName, getSectionPathName, sections} from "../../components/whitepaper/navigation";

export default function Home({section}){
    return <>
        {WhitepaperStyles}
        <WhitePaper defaultSection={section}/>
    </>
}

export async function getStaticProps(context){
    let sectionPathName = context.params.section;
    let section = getSectionBySectionPathName(sectionPathName);
    if (section === undefined) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            section
        }
    }
}

export async function getStaticPaths(context){
    let sectionPathNames = [];
    sections.forEach((section) => sectionPathNames.push(getSectionPathName(section)));
    let paths = [];
    sectionPathNames.forEach((pathName) => paths.push({params: {section: pathName}}));
    return {
        paths: paths,
        fallback: false,
    }
}

Home.needChakra = true;
Home.needThirdweb = false;