import React, { useEffect, useState } from 'react'
import { socket } from './connections/socket';

export default function LandingPage() {
    const [typingRoomName, setTypingRoomName] = useState("");

    function createGameHandler() {
        //console.log("Sending request");
        socket.emit("newGame");
        return;
      }
      function joinSubmitHandler() {
        socket.emit("joinGame", typingRoomName);
        return;
      }

  return (
    <section className="vh-100">
    <div>
      <div id="initialScreen" className="h-100">
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <u>
            <h3>
              Made by Adnan Ahmed. Connect me on{" "}
              <a href="https://www.linkedin.com/in/adnan-ahmed99/">
                LinkedIn
              </a>
            </h3>
          </u>
          <br />
          <h1>Chess Talks</h1>
          <button
            type="submit"
            className="btn btn-success"
            id="newGameButton"
            onClick={createGameHandler}
          >
            Create New Game
          </button>
          <div>OR</div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Game Code"
              id="gameCodeInput"
              value={typingRoomName}
              onChange={(e) => {
                setTypingRoomName(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            id="joinGameButton"
            onClick={joinSubmitHandler}
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}
