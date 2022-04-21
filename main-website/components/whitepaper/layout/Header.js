import {Box, Button, Center, Grid, GridItem, HStack} from "@chakra-ui/react";
import {Logo} from "./Logo";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {HamburgerIcon} from "@chakra-ui/icons";

export const Header = ({onMenuOpen}) => {
    const size = useWindowSize();
    return(
        <Grid width="100%" height="100%" templateColumns="300px auto" backgroundColor="">
            <GridItem>
                <HStack height="100%" spacing="0">
                    {
                        size.width < 800 ?
                        <Center width="46px" height="100%" onClick={onMenuOpen}>
                            <HamburgerIcon height="18px" width="18px"/>
                        </Center> : ""
                    }
                    <Logo />
                </HStack>
            </GridItem>
        </Grid>
    );

}