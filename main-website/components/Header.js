import React from "react";
import Link from "next/link";
import header from "../styles/header.module.css";
import global from "../styles/global.module.css";
function Header() {
  return (
    <header className={header.header}>
      <div className={`${header.header__container} ${global.container}`}>
        <Link href="/">
          <a className={header.logo}>PoolWars</a>
        </Link>
        <div className={header.panel}>
          <div className={header.nav}>
            <ul className={header.nav__list}>
              <li className={header.nav__item}>
                <Link href="/airdrop">
                  <a className={header.nav__link}>AirDroap</a>
                </Link>
              </li>
              <li className={header.nav__item}>
                <Link href="/#roadMap">
                  <a className={header.nav__link}>RoadMap</a>
                </Link>
              </li>
              <li className={header.nav__item}>
                <Link href="/profile">
                  <a className={header.nav__link}>Profile</a>
                </Link>
              </li>
              <li className={header.nav__item}>
                <Link href="/#faq">
                  <a className={header.nav__link}>FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={header.socials}>socials</div>
          <div className={header.metamask}>
            <button className={header.metamask__button}>
              <span>metamask</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
