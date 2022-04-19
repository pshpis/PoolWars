import { Grid, GridItem } from '@chakra-ui/react'
import {Header} from "./Header";
import {Menu} from "./Menu";
import {useState} from "react";
import {sections} from "../navigation";

export const Layout = ({children, currentSection, setCurrentSection}) => {
    let borderStyle = "1px solid rgba(211,220,228,1.00)";
    let headerShadow = "0px 4px 10px rgb(0 0 0 / 5%)";



    return(
        <Grid overflow="hidden" width="100%" height="100%" templateColumns="300px auto" templateRows="80px auto">
            <GridItem colSpan={2} borderBottom={borderStyle} boxShadow={headerShadow}><Header/></GridItem>
            <GridItem colSpan={1} borderRight={borderStyle}>
                <Menu currentSection={currentSection} setCurrentSection={setCurrentSection}/>
            </GridItem>
            <GridItem colSpan={1} overflow="scroll">{children}</GridItem>
        </Grid>
    )
}