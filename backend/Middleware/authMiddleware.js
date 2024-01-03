const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  let authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ status: "Please Login First" });
  }
  const token = authToken.split(" ")[1];

  jwt.verify(token, process.env.secretToken, function (err, decoded) {
    req.body.userId = decoded.id;
    next();
  });
};

module.exports = { authMiddleware };