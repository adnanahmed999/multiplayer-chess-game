import React from "react";
import { useState, useEffect } from "react";
import { socket } from "./connections/socket";
import VideoCall from "./connections/VideoCall";
import LandingPage from "./LandingPage";
import LaunchGame from "./LaunchGame";

export default function RedirectingPage() {
  const [gotTheRoomName, setGotTheRoomName] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [gotUnknownCode, setGotUnknownCode] = useState(false);
  const [gotTooManyPlayers, setHandleTooManyPlayers] = useState(false);
  const [bothJoined, setBothJoined] = useState(false);
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);

  function handleGameCode(roomName) {
    setRoomName(roomName);
    setGotTheRoomName(true);
  }

  function handleUnknownCode() {
    setGotUnknownCode(true);
  }

  function handleTooManyPlayers() {
    setHandleTooManyPlayers(true);
  }

  function handleBothJoined() {
    setBothJoined(true);
  }

  function handleOpponentDisconnected() {
    setOpponentDisconnected(true);
  }

  useEffect(() => {
    socket.on("gameCode", handleGameCode);
    socket.on("unknownCode", handleUnknownCode);
    socket.on("tooManyPlayers", handleTooManyPlayers);
    socket.on("bothJoined", handleBothJoined);
    socket.on("opponentDisconnected", handleOpponentDisconnected);
  }, []);

  useEffect(()=> {
    if(bothJoined) 
      socket.emit("sendOtherPlayerClientID", roomName);
  },[bothJoined])

  return (
    <>
      {opponentDisconnected ? (
        <div>Opponent disconnected</div>
      ) : gotUnknownCode ? (
        <div>Got unknown code</div>
      ) : gotTooManyPlayers ? (
        <div>Got too many players</div>
      ) : bothJoined ? (
        <div className="mainDiv">
          <VideoCall className="mainDiv-Child" />
          <LaunchGame className="mainDiv-Child" />
          </div>
      ) : gotTheRoomName ? (
        <div>{roomName}</div>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
