import React from 'react';
import Square from "./Square";
import Piece from "./Piece";

export default function BoardSquare({ piece, isBlack }) {
  return (
    <div className="board-square">
      <Square isBlack={isBlack}>{piece ? <Piece piece={piece}></Piece> : null}</Square>
    </div>
  );
}
