import * as Chess from "chess.js"
import { BehaviorSubject } from "rxjs"

const chess = new Chess()

// For promotion:
// const chess = new Chess("rn1qkbnr/pPpb1ppp/4p3/8/3p4/8/PP1PPPPP/RNBQKBNR w KQkq - 1 5")

export const gameSubject = new BehaviorSubject()

export const initGame = ()=> {
    updateGame()
}

export const handleMove = (source, destination) => {
  const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
  if (promotions.some(p => `${p.from}:${p.to}` === `${source}:${destination}`)) {
      const pendingPromotion = { from: source, to: destination, color: promotions[0].color }
      updateGame(pendingPromotion)
  }
  const {pendingPromotion} = gameSubject.getValue();
  if(!pendingPromotion) {
    move(source, destination);
  }
};

export const move = (source, destination, promotion) => {
  const moveOject = {from: source, to: destination};
  if(promotion) moveOject.promotion = promotion
  chess.move(moveOject);
  updateGame();
};

const updateGame = (pendingPromotion)=> {
    const newGame = {
        board: chess.board(),
        pendingPromotion
    }
    gameSubject.next(newGame)
}