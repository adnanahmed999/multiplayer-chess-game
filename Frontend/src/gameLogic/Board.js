import React, { useEffect, useState } from "react";
import BoardSquare from "./BoardSquare";
import { playerNumber } from "../connections/socket";

export default function Board({ board }) {
  const [currBoard, setCurrBoard] = useState([]);

  useEffect(() => {
    setCurrBoard(playerNumber === 1 ? board.flat() : board.flat().reverse());
  }, [board, playerNumber]);

  const getXYPosition = (i) => {
    const x = playerNumber === 1 ? i % 8 : 7 - (i % 8);
    const y = playerNumber === 1 ? 7 - Math.floor(i / 8) : Math.floor(i / 8);
    return { x, y };
  };

  const isBlack = (i) => {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 0;
  };

  const getPosition = (i) => {
    const { x, y } = getXYPosition(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };

  return (
    <div className="board">
      {currBoard.map((piece, i) => {
        return (
          <div key={i} className="square">
            <BoardSquare
              piece={piece}
              isBlack={isBlack(i)}
              position={getPosition(i)}
            />
          </div>
        );
      })}
    </div>
  );
}
