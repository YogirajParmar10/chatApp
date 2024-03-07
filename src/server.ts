import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app: express.Application = express();
const server = createServer(app);
const io: Server = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
  // rejectUnauthorized: false,
});

app.use(express.static("public"));

io.on("connect_error", (err: Error) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket: Socket) => {
  console.log("Client connected:", socket.id);

  socket.on("chat", (data: any) => {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data: any) => {
    socket.broadcast.emit("typing", data);
  });
});

io.on("error", (error: Error) => {
  console.error("Socket.IO error:", error);
});

server.listen(8080);
