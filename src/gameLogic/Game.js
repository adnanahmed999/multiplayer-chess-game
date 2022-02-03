import * as Chess from "chess.js"
import { BehaviorSubject } from "rxjs"

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export const initGame = ()=> {
    updateGame()
}

const updateGame = ()=> {
    const newGame = {
        board: chess.board()
    }
    gameSubject.next(newGame)
}