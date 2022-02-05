import React from 'react';
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { handleMove } from './Game';

export default function BoardSquare({ piece, isBlack, position }) {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const itemData = item.id.split("_");
      const sourcePosition = itemData[0];
      handleMove(sourcePosition, position)
    },
  });
  return (
    <div ref={drop} className="board-square">
      <Square isBlack={isBlack}>
        {piece ? <Piece piece={piece} position={position}></Piece> : null}
      </Square>
    </div>
  );
}
