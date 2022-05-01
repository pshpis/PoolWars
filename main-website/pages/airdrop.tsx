import React from "react";
import Airdrop from "../components/Airdrop";
import PageContainer from "../components/PageContainer";
import airdrop from "../styles/airdrop.module.css";
import global from "../styles/global.module.css";

import prisma from "../lib/prisma";

function AirdropPage() {
  return (
    <PageContainer>
      <section className={airdrop.airdrop}>
        <div className={`${airdrop.container} ${global.container}`}>
          <Airdrop />
        </div>
      </section>
    </PageContainer>
  );
}

export default AirdropPage;
