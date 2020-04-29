const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;

      if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: "error" });
          } else {
            req.decodedToken = decodedToken;
            next();
          }
        });
      } else {
        throw new Error("unacceptable auth data");
      }
    } else {
      throw new Error("invalid token");
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
