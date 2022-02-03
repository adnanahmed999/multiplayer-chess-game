import logo from "./logo.svg";
import "./App.css";
import {gameSubject, initGame} from "./gameLogic/Game"
import { useEffect, useState } from "react";


function App() {
  const [board, setBoard] = useState([])
  useEffect(()=> {
    initGame()
    const subscribe = gameSubject.subscribe((observer)=> {
      setBoard(observer.board)
    })
    return ()=> {
      subscribe.unsubscribe()
    }
  })
  return <div></div>;
}

export default App;
