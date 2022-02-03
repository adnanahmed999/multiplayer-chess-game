import React from "react";

export default function Board({ board }) {
  return (
    <div>
        {
            board.flat().map((piece,i)=> {
                console.log(piece)
                return <div key={i}>{JSON.stringify(piece)}</div>
            })
        }
    </div>
  )
}
