import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MultiplayerChess from './MultiplayerChess';

export default function LaunchGame() {
  return (
    <>
        <DndProvider backend={HTML5Backend}>
            <MultiplayerChess/>
        </DndProvider>
    </>
  )
}
