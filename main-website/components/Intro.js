import React from "react";

import intro from "../styles/intro.module.css";
import global from "../styles/global.module.css";

function Intro() {
  return (
    <section className={intro.intro}>
      <div className={`${intro.container} ${global.container}`}>
        <div className={intro.wrapper}>
          <div className={intro.info}>
            <div className={intro.title}>
              INFO Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </div>
            <div className={intro.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ex
              natus iure porro ad, officia nobis autem suscipit quaerat,
              mollitia saepe dicta id animi culpa. Fuga eligendi quibusdam
              officia commodi.
            </div>
          </div>
          <div className={`${intro.calc} ${intro}`}>
            <div className={intro.calc__title}>Shield airdrop is Open now</div>
            <div className={intro.calc__info}>
              info Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Fugit vel excepturi iure minima amet dolores optio
            </div>
            <button className={intro.calc__button}>Get warlord’s shield</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
