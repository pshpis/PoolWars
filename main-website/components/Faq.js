import React from "react";
import faq from "../styles/faq.module.css";
import global from "../styles/global.module.css";

function Faq() {
  return (
    <section className={global.section} id="faq">
      <div className={`${global.section__container} ${global.container}`}>
        <div className={global.section__header}>FAQ</div>
        <div className={faq.wrapper}>
          <ul className={faq.list}>
            <li className={faq.item}>
              <div className={faq.item__header}>
                <div className={faq.item__title}>quest 1</div>
                <div className={faq.control}></div>
              </div>
            </li>
            <li className={faq.item}>
              <div className={faq.item__header}>
                <div className={faq.item__title}>quest 1</div>
                <div className={faq.control}></div>
              </div>
            </li>
            <li className={faq.item}>
              <div className={faq.item__header}>
                <div className={faq.item__title}>quest 1</div>
                <div className={faq.control}></div>
              </div>
            </li>
            <li className={faq.item}>
              <div className={faq.item__header}>
                <div className={faq.item__title}>quest 1</div>
                <div className={faq.control}></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Faq;
