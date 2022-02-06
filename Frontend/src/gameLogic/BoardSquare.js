import React, { useEffect, useState } from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { gameSubject, handleMove } from "./Game";
import Promote from "./Promote";

export default function BoardSquare({ piece, isBlack, position }) {
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    const subscription = gameSubject.subscribe(({ pendingPromotion }) => {
      if (pendingPromotion && pendingPromotion.to == position) {
        setPromotion(pendingPromotion);
      } else {
        setPromotion(null)
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [position]);

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const itemData = item.id.split("_");
      const sourcePosition = itemData[0];
      handleMove(sourcePosition, position);
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
