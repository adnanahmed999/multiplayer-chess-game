const express =  require('express')
const socketIo = require('socket.io')
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const { isObject } = require("util");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3003;
const io = socketIo(server, { cors: { origin: "*" } });
app.use(cors());

// map of client_id vs room name
const clientRooms = {};

// Rooms in socket.io are implicitly created and implicitly deleted. Basically they are automatically removed when they are empty.

// https://stackoverflow.com/questions/23342395/how-to-delete-a-room-in-socket-io
// Use this code while disconnecting to server.

io.on("connection", (client) => {
  client.on("newGame", handleNewGame);
  client.on("joinGame", handleJoinGame);

  function handleNewGame() {
    // Genertating a unique roomName
    // console.log("Got a request");
    let roomName = uuidv4();
    let doesRoomExistWithSameName = io.sockets.adapter.rooms.has(roomName);
    while (doesRoomExistWithSameName) {
      roomName = uuidv4();
      doesRoomExistWithSameName = io.sockets.adapter.rooms.has(roomName);
    }
    client.number = 1;
    client.join(roomName);
    clientRooms[client.id] = roomName;
    client.emit("gameCode", roomName);
    // console.log("The game code is: ", roomName);
    client.emit("init", { playerNumber: 1, clientID: client.id, roomName });
  }

  function handleJoinGame(roomName) {
    const room = io.sockets.adapter.rooms.has(roomName);
    let numberOfPlayersInRoom;
    if (!room) {
      client.emit("unknownCode");
      return;
    }
    numberOfPlayersInRoom = io.sockets.adapter.rooms.get(roomName).size;
    if (numberOfPlayersInRoom == 0) {
      client.emit("unknownCode");
      return;
    } else if (numberOfPlayersInRoom > 1) {
      client.emit("tooManyPlayers");
      return;
    }
    client.join(roomName);
    clientRooms[client.id] = roomName;
    client.number = 2;
    io.sockets.in(roomName).emit("bothJoined");
  }
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});