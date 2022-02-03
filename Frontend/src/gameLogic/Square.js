import React from "react";

export default function Square({ children, isBlack }) {
  const colorClass = isBlack ? "square-black" : "square-white";
  return <div className={`${colorClass} board-square`}>{children}</div>;
}
