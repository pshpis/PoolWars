import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import main from "../styles/main.module.css";
function PageContainer({ children }) {
  return (
    <div className={main.container}>
      <Header />
      <div className={main.main}>{children}</div>
      <Footer />
    </div>
  );
}

export default PageContainer;
