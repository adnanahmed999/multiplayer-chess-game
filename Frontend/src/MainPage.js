import React from "react";
import { useState } from "react";

export default function MainPage() {
  const [typingRoomName, setTypingRoomName] = useState("");

  const createGameHandler = () => {
    return;
  };
  const joinSubmitHandler = () => {
    return;
  };

  return (
    <div>
      <section className="vh-100">
        <div>
          <div id="initialScreen" className="h-100">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <u>
                <h1>
                  Made by Adnan Ahmed. Connect me on{" "}
                  <a href="https://www.linkedin.com/in/adnan-ahmed99/">
                    LinkedIn
                  </a>
                </h1>
              </u>
              <br />
              <h2>Chess Talks</h2>
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
    </div>
  );
}
