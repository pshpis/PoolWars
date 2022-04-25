import {Box, Button, Center, Grid, GridItem, HStack, Stack} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {HamburgerIcon} from "@chakra-ui/icons";

export const Header = ({onMenuOpen}) => {
    const size = useWindowSize();
    let templateColumns = "300px auto";
    if (size.width > 1500){
        templateColumns = (size.width - 910) / 2 + "px auto";
    }
    return(
        <Grid width="100%" height="100%" templateColumns={templateColumns} backgroundColor="">
            <GridItem paddingLeft="0">
                <Stack height="100%" spacing="0" direction="row">
                    {
                        size.width < 800 ?
                        <Center width="46px" height="100%" onClick={onMenuOpen}>
                            <HamburgerIcon height="28px" width="28px"/>
                        </Center> : ""
                    }
                    <Logo />
                </Stack>
            </GridItem>
        </Grid>
    );

}