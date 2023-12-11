const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const path = require("path");

// routes
const userRoutes = require("./modules/user/user.routes");

const app = express();
const http = require("http");
const Server = http.createServer(app);
const socketIo = require("socket.io");

// middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 })
);

connectDB();

// routes
app.use("/api/v1/users", userRoutes);

// static file serving
app.use("/api/v1/uploads", express.static(path.join(__dirname, "/")));

// -----------------socket server-----------------
// const io = socketIo(Server, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log("connected. 🟢");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId }) => {
//     io.emit("getMessage", {
//       senderId,
//     });
//   });

//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("disconnected! 🔴");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

// -----------------socket server-----------------

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

Server.listen(PORT, () => {
  console.log(`Server is Running PORT: ${PORT}`);
});
