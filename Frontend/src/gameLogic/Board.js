import React from "react";

export default function Board({ board }) {
  return (
    <div className="board">
      {board.flat().map((piece, i) => {
        return (
          <div key={i} className="square">
            {JSON.stringify(piece)}
          </div>
        );
      })}
    </div>
  );
}
    