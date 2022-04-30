import React from "react";
import card from "../styles/card.module.css";
import Link from "next/link";
function Card({ data }) {
  console.log(data);

  return (
    <Link href={`/gallery/[id]`}>
      <a class={`${card.card} ${card.compact}`}>
        <div class={card.image__wrap}>
          <img src={data.metadata.image} />
        </div>
        <ul class={card.desc} page="2">
          <li class={card.desc__item}>
            <span class={card.desc__id}>{data.metadata.id._hex}</span>
            <span class={card.desc__value}>world</span>
          </li>
          <li class={card.desc__item}>
            <span class={card.desc__legend}>Rarity Rank</span>
            <span class={card.desc__value}>1467</span>
          </li>
        </ul>
      </a>
    </Link>
  );
}

export default Card;
