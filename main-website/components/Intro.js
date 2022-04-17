import React from "react";

import intro from "../styles/intro.module.css";
import global from "../styles/global.module.css";

function Intro() {
  return (
    <section className={intro.intro}>
      <div className={`${intro.intro__container} ${global.container}`}>
        <div className={intro.intro__wrapper}>
          <div className={intro.intro__info}>
            <div className={intro.intro__title}>
              INFO Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </div>
            <div className={intro.intro__desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ex
              natus iure porro ad, officia nobis autem suscipit quaerat,
              mollitia saepe dicta id animi culpa. Fuga eligendi quibusdam
              officia commodi.
            </div>
          </div>
          <div className={`${intro.intro__calc} ${intro}`}>
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
