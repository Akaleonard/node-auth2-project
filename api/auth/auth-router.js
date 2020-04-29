const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");
const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = brcypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      const token = genToken(saved);

      res.status(201).json({ saved, token });
    })
    .catch((err) => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({ username: user.username, token });
      } else {
        res.status(401).json({ message: "error" });
      }
    })
    .catch((err) => {
      res.status(500).json(error);
    });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
    department: user.department,
  };

  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
