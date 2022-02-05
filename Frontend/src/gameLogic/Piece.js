import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

export default function Piece({ piece }) {
  const { type, color } = piece;
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: "piece",
      id: `${type}_${color}`,
    },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });
  const pieceImg = require(`./assets/${type}_${color}.png`);
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div className="piece-container" style={{ opacity: isDragging ? 0 : 1 }}>
        <img ref={drag} src={pieceImg} alt="" className="piece" />
      </div>
    </>
  );
}
