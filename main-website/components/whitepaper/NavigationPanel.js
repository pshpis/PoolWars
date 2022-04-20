import {Box, Flex, HStack, Spacer, Stack, Text} from "@chakra-ui/react";
import {sections} from "./navigation";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useWindowSize} from "../../hooks/useWindowSize";

function getSectionId(section){
    return sections.indexOf(section);
}

export const NavigationPanel = ({currentSection, setCurrentSection}) => {
    const size = useWindowSize();
    let miniSize = size.width != null && size.width <= 910;
    console.log(sections);
    console.log(currentSection);
    console.log(getSectionId(currentSection));

    const goNextSection = () => {
        let sectionId = getSectionId(currentSection);
        setCurrentSection(sections[sectionId + 1]);
    }

    const goPreviousSection = () => {
        let sectionId = getSectionId(currentSection);
        setCurrentSection(sections[sectionId - 1]);
    }

    let isFirstButton = getSectionId(currentSection) < sections.length - 1;
    let isSecondButton = getSectionId(currentSection) > 0;

    let firstButton = isFirstButton ?
    <Box flexGrow="1" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
         border="1px solid rgba(227,232,237,1.00)" borderRadius="4px" onClick={goNextSection}
         margin={isSecondButton ? !miniSize ? "0 16px 0 0" : "0 0 16px 0"  : ""}>
        Next
    </Box> : "";

    let secondButton = isSecondButton ?
    <Box flexGrow="1" height="74px" minWidth="74px" boxShadow="0px 1px 2px rgb(0 0 0 / 12%)"
         border="1px solid rgba(227,232,237,1.00)" borderRadius="4px" onClick={goPreviousSection}>
        Previous
    </Box> : "";

    return <Box paddingLeft="80px" marginTop="24px" maxWidth="910px" paddingRight="80px">
        <Flex direction={isFirstButton ? !miniSize ? "row" : "column" : ""} width="100%" wrap="wrap">
            {firstButton}
            {secondButton}
        </Flex>
        <hr style={{marginTop: "24px",marginBottom:"24px"}}/>
        <Text color="rgba(136,153,168,1.00)" marginBottom="40px">Last modified 1mo ago</Text>
    </Box>;
}