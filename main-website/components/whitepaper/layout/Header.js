import {Box, Grid, GridItem} from "@chakra-ui/react";
import {Logo} from "./Logo";

export const Header = () => {
    return(
        <Grid width="100%" height="100%" templateColumns="300px auto" backgroundColor="">
            <GridItem>
                <Logo />
            </GridItem>
        </Grid>
    );

}