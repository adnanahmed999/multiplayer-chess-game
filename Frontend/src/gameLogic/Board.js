import React from "react";
import BoardSquare from "./BoardSquare";
export default function Board({ board }) {
  
  const getXYPosition = (i) => {
    const x = i % 8;
    const y = 7 - Math.floor(i / 8);
    return { x, y };
  };

  const isBlack = (i) => {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 0;
  };

  const getPosition = (i) => {
    const { x, y } = getXYPosition(i)
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][
      x
    ]
    return `${letter}${y + 1}`
  }

  return (
    <div className="board">
      {board.flat().map((piece, i) => {
        return (
          <div key={i} className="square">
            <BoardSquare piece={piece} isBlack={isBlack(i)}  position={getPosition(i)} />
          </div>
        );
      })}
    </div>
  );
}