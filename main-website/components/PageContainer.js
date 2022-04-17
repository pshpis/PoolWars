import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import main from "../styles/main.module.css";
function PageContainer({ children }) {
  return (
    <>
      <Header />
      <div className={main.main}>{children}</div>
      <Footer />
    </>
  );
}

export default PageContainer;
