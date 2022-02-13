import * as Chess from "chess.js"
import { BehaviorSubject } from "rxjs"

const chess = new Chess()

// For promotion:
// const chess = new Chess("rn1qkbnr/pPpb1ppp/4p3/8/3p4/8/PP1PPPPP/RNBQKBNR w KQkq - 1 5")

export const gameSubject = new BehaviorSubject()

export function initGame() {
  updateGame()
}

export function handleMove(moveDetails) {
  //console.log("here1")
  const from = moveDetails.from
  const to = moveDetails.to
  const isThisMoveForPromotion = moveDetails.isThisMoveForPromotion
  const { pendingPromotion } = gameSubject.getValue()
  const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
  if (isThisMoveForPromotion) {
    chess.move({ from, to, promotion: moveDetails.piece })
    updateGame()
    return
  } else if (pendingPromotion) {
    return
  } else if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color }
    updateGame(pendingPromotion)
    return
  } else {
    chess.move({ from, to })
    updateGame()
  }
}

function updateGame(pendingPromotion) {
  const newGame = {
    board: chess.board(),
    turn: chess.turn(),
    pendingPromotion
  }
  gameSubject.next(newGame)
}