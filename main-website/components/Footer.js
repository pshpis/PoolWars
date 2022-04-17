import React from "react";

import footer from "../styles/footer.module.css";
import global from "../styles/global.module.css";

function Footer() {
  return (
    <footer className={footer.footer}>
      <div className={`${footer.footer__container} ${global.container}`}>
        <div className={footer.footer__top}>
          <div className={footer.footer__logo}>PoolWars</div>
          <ul className={footer.footer__social}>
            <li className={footer.footer__social__item}>social 1</li>
            <li className={footer.footer__social__item}>social 2</li>
            <li className={footer.footer__social__item}>social 3</li>
            <li className={footer.footer__social__item}>social 4</li>
            <li className={footer.footer__social__item}>social 5</li>
          </ul>
        </div>
        <div className={footer.footer__bottom}>
          <div className={footer.footer__side}></div>
          <div className={footer.footer__desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            consectetur ipsum eaque dicta eius quae impedit voluptate, ipsa
            veritatis. Unde illo excepturi nesciunt quam perspiciatis ad
            praesentium, atque obcaecati est!
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
