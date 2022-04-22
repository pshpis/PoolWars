import {Box, VStack} from "@chakra-ui/react";
import {sections, getSectionPathName, getContent} from "../navigation";
import {useState} from "react";
import {useRouter} from "next/router";


const MenuElement = ({currentSection, setCurrentSection, onMenuClose, section}) => {
    if (!sections.includes(section)) throw new Error("Section is not a string");

    const [isHover, setHover] = useState(false);
    const isActive = () => currentSection === section;
    const router = useRouter();

    const onClick = () => {
      setCurrentSection(section);
      router.push("/whitepaper/" + getSectionPathName(section));
      onMenuClose();
    }

    let color = isActive() ? "rgba(52,109,219,1.00)" : "rgba(92,105,117,1.00)";
    let border = isActive() ? "solid 1px rgba(211,220,228,1.00)" : "solid 1px rgba(0,0,0,0.00)";
    let backgroundColor = isActive() ? "white" : isHover ? "#ECEFF1" : "rgba(0,0,0,0.00)";

    return (
        <Box lineHeight="38px" height="38px" width="100%"
            paddingLeft="16px" color={color}
            fontSize="14px" border={border}
            borderRightWidth="0px" backgroundColor={backgroundColor}
            onClick={onClick} onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
                {section}
        </Box>
    );
}

export const Menu = ({currentSection, setCurrentSection, onMenuClose}) => {

    let menuElements = sections.map((section) => <MenuElement currentSection={currentSection} setCurrentSection={setCurrentSection} onMenuClose={onMenuClose} key={section} section={section}/>);
    return (
        <VStack paddingTop="16px" paddingLeft="24px" width="100%" height="100%" backgroundColor="rgba(245,247,249,1.00)" spacing="0">
            {menuElements}
        </VStack>
    )
}