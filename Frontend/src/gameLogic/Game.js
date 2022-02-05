import * as Chess from "chess.js"
import { BehaviorSubject } from "rxjs"

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export const initGame = ()=> {
    updateGame()
}

export const handleMove = (source, destination) => {
  move(source, destination);
};

export const move = (source, destination) => {
  chess.move({ from: source, to: destination });
  updateGame();
};

const updateGame = ()=> {
    const newGame = {
        board: chess.board()
    }
    gameSubject.next(newGame)
}