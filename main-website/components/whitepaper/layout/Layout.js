import {Box, Grid, GridItem, useDisclosure, VStack} from '@chakra-ui/react'
import {Header} from "./Header";
import {Menu} from "./Menu";
import {useState} from "react";
import {sections} from "../navigation";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import {useWindowSize} from "../../../hooks/useWindowSize";

export const Layout = ({children, currentSection, setCurrentSection}) => {
    let borderStyle = "1px solid rgba(211,220,228,1.00)";
    let headerShadow = "0px 4px 10px rgb(0 0 0 / 5%)";

    const size = useWindowSize();
    const {isOpen, onOpen, onClose} = useDisclosure();
    return(
        <Grid overflow="hidden" width="100%" height="100%" templateColumns="300px auto"
              templateRows={size.width > 800 ? "80px auto" : "64px auto"}>
            <GridItem colSpan={2} borderBottom={borderStyle} boxShadow={headerShadow}>
                <Header onMenuOpen={onOpen}/>
            </GridItem>
            {
                size.width > 800 ?
                <GridItem colSpan={1} borderRight={borderStyle}>
                    <Menu currentSection={currentSection} setCurrentSection={setCurrentSection} onMenuClose={onClose}/>
                </GridItem> :
                <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <VStack height="100%" width="100%" spacing="0">
                            <Box boxShadow="0px 1px 2px rgb(0 0 0 / 12%)" borderBottom="solid 1px rgba(211,220,228,1.00)"
                                                                height="64px" width="100%" minHeight="64px"
                                                                backgroundColor="white"><DrawerCloseButton marginTop="8px"/></Box>
                            <Menu onMenuClose={onClose} currentSection={currentSection} setCurrentSection={setCurrentSection}/>
                        </VStack>

                    </DrawerContent>
                </Drawer>
            }

            <GridItem colSpan={size.width > 800 ? 1 : 2} overflowY="scroll">
                <Box paddingLeft={size.width > 800 ? "80px" : "16px"} paddingRight={size.width > 800 ? "80px" : "16px"} paddingTop="24px" maxWidth="910px" paddingBottom="8px" color="rgba(59,69,78,1.00)">
                    {children}
                </Box>
            </GridItem>
        </Grid>
    )
}