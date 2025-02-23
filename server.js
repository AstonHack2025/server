const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend to access backend
    methods: ["GET", "POST"],
  })
);

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let code = "// Start coding..."

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);
    io.emit("receiveMessage", message);
  });

  socket.emit("load-code", code);

  socket.on("code-change", (newCode) => {
    code = newCode;
    socket.broadcast.emit("code-change", newCode);
  });



  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
