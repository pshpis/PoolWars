import React from "react";
import card_grid from "../styles/card_grid.module.css";
import Card from "./Card";
function CardGrid({ cards }) {
  console.log(cards);
  return (
    <div className={card_grid.wrapper}>
      <div className={card_grid.card_grid}>
        {cards.map((card) => (
          <div className={card_grid.item}>
            <Card data={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
