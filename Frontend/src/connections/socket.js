import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3003";
const socket = io(ENDPOINT);

var playerNumber;
var roomName;
var myID; // clientID of the user

socket.on("init", (detailsObject) => {
  playerNumber = detailsObject.playerNumber;
  myID = detailsObject.clientID;
  roomName = detailsObject.roomName;
});

export { socket, playerNumber, roomName, myID };