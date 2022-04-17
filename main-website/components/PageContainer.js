import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function PageContainer({ children }) {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
}

export default PageContainer;
