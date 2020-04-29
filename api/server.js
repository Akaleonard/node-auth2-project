const express = require("express");

const jwt = require("jsonwebtoken");

const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const server = express();

server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Server is up!");
});

module.exports = server;
