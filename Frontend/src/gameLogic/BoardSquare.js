import React, { useEffect, useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { gameSubject, handleMove } from "./Game";
import Promote from "./Promote";
import { playerNumber } from "../connections/socket";
import { socket } from "../connections/socket";

export default function BoardSquare({ piece, isBlack, position }) {
  const [promotion, setPromotion] = useState(null);
  const [currentTurn, setCurrentTurn] = useState();

  useEffect(() => {
    const subscription = gameSubject.subscribe(({ pendingPromotion, turn }) => {
      if (pendingPromotion && pendingPromotion.to == position)
        setPromotion(pendingPromotion);
      else setPromotion(null);
      setCurrentTurn(turn);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [position]);

  useEffect(() => {
    socket.on("tryThisMove", (moveDetails) => {
      //console.log(moveDetails);
      handleMove(moveDetails);
    });
  }, []);

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const itemData = item.id.split("_");
      //console.log(itemData);
      const sourcePosition = itemData[0];
      const droppedPieceColor = itemData[2];
      //console.log(playerNumber, droppedPieceColor);
      if (
        (playerNumber === 1 &&
          droppedPieceColor === "w" &&
          currentTurn === "w") ||
        (playerNumber === 2 && droppedPieceColor === "b" && currentTurn === "b")
      ) {
        const moveDetails = {
          from: sourcePosition,
          to: position,
          isThisMoveForPromotion: false,
        };
        socket.emit("movePiece", moveDetails);
      }
    },
  });

  return (
    <div ref={drop} className="board-square">
      <Square isBlack={isBlack}>
        {piece ? (
          promotion ? (
            <Promote pendingPromotion={promotion}></Promote>
          ) : (
            <Piece piece={piece} position={position}></Piece>
          )
        ) : null}
      </Square>
    </div>
  );
}
