
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request
    req.user = decoded;

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error("JWT verification failed:", err.message || err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
