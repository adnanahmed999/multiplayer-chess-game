import React from 'react';
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";

export default function BoardSquare({ piece, isBlack }) {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      console.log(item);
    },
  });
  return (
    <div ref={drop} className="board-square">
      <Square isBlack={isBlack}>
        {piece ? <Piece piece={piece}></Piece> : null}
      </Square>
    </div>
  );
}
