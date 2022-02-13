import "./App.css";
import {gameSubject, initGame} from "./gameLogic/Game"
import { useEffect, useState } from "react";
import Board from "./gameLogic/Board";

function MultiplayerChess() {
  const [board, setBoard] = useState([])
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((observer) => {
      setBoard(observer.board);
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);
  return (
    <div className="container">
      <div className="board-container">
        <Board board={board}/>
      </div>
    </div>
  )
}

export default MultiplayerChess;
