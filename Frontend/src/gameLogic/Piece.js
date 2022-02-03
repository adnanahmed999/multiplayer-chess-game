import React from "react";

export default function Piece({ piece }) {
  const { type, color } = piece;
  const pieceImg = require(`./assets/${type}_${color}.png`);
  return (
    <div className="piece-container">
      <img src={pieceImg} alt="" className="piece" />
    </div>
  );
}
