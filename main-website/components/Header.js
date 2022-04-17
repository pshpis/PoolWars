import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <Link href="/">
          <a className="logo">PoolWars</a>
        </Link>
        <div className="panel">
          <div className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link href="/airdrop">
                  <a className="nav__link">AirDroap</a>
                </Link>
              </li>
              <li className="nav__item">
                <Link href="/#roadMap">
                  <a className="nav__link">RoadMap</a>
                </Link>
              </li>
              <li className="nav__item">
                <Link href="/profile">
                  <a className="nav__link">Profile</a>
                </Link>
              </li>
              <li className="nav__item">
                <Link href="/#faq">
                  <a className="nav__link">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="socials">socials</div>
          <div className="metamask">metamask</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
