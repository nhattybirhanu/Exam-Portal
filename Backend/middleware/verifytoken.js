const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()
const config = process.env;

const verifyToken = (req, res, next) => {
  let token =
    req.headers["authorization"];
  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;