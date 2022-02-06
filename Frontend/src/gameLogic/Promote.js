import React from "react";
import { move } from "./Game";

export default function Promote({ pendingPromotion }) {
  const possiblePieces = ["r", "n", "b", "q"];
  return (
    <div className="promote-container">
      {possiblePieces.map((piece, i) => {
        const bgClass = i % 3 == 0 ? "square-black" : "square-white";
        const pieceImg = require(`./assets/${piece}_${pendingPromotion.color}.png`);
        return (
          <div key={i} className={`${bgClass} promote-piece`}>
            <img
              onClick={() => {
                move(pendingPromotion.from, pendingPromotion.to, piece);
              }}
              className="piece"
              src={pieceImg}
              alt={piece}
            />
          </div>
        );
      })}
    </div>
  );
}
