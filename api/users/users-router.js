const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted_middleware");

router.get("/", (req, restricted, res) => {
  const { department } = req.decodedJwt;
  Users.findByDepartment(department)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
