import React from "react";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Intro from "../components/Intro";
import PageContainer from "../components/PageContainer";
import RoadMap from "../components/RoadMap";

function Home() {
  return (
    <PageContainer>
      <Intro />
      <RoadMap />
      <Faq />
    </PageContainer>
  );
}

export default Home;
