// src/socket.js
import { io } from "socket.io-client";

// Initialize Socket.IO instance
const socketInstance = io("http://15.206.16.230:4100", {
  transports: ["websocket"], // Optional: Ensures WebSocket transport
  reconnection: true, // Reconnect automatically
  reconnectionAttempts: 5, // Number of attempts before failing
  reconnectionDelay: 1000, // Delay between reconnections
});

export default socketInstance;
