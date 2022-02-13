import React, { isValidElement } from "react";
import { socket, playerNumber } from "../connections/socket";

export default function Promote({ pendingPromotion }) {
  const possiblePieces = ["r", "n", "b", "q"];
  const color = pendingPromotion.color

  function isValid(playerNumber,color) {
    return ( (playerNumber===1 && color==='w') || (playerNumber===2 && color==='b') )
  }

  return (
    <div className="promote-container">
      {possiblePieces.map((piece, i) => {
        const bgClass = i % 3 == 0 ? "square-black" : "square-white";
        const pieceImg = require(`./assets/${piece}_${color}.png`);
        return (
          <div key={i} className={`${bgClass} promote-piece`}>
            <img
              onClick={() => {
                if(isValid(playerNumber,color))
                  socket.emit('movePiece',{from: pendingPromotion.from, to:pendingPromotion.to, piece, isThisMoveForPromotion:true});
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
