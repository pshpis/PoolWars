import { useState} from "react";
import {LandingStyles} from "../styles/SectionsGlobalStyles";
import {Profile} from "../components/landing/Profile/Profile";
import {Box} from "@chakra-ui/react";

function Home() {

  return (
    <Box overflow="hidden">
      {LandingStyles}
      <Profile/>
    </Box>
  );
}

Home.needChakra = true;
Home.needWeb3 = true;
export default Home;
