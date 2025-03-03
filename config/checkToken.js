// config/checkToken.js

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("checkToken middleware invoked"); // Debug log

  // Get the token from the Authorization header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    console.log("No Authorization header provided");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Ensure the header is in "Bearer <token>" format
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.log("Invalid Authorization header format:", authHeader);
    return res.status(401).json({ error: "Unauthorized: Invalid token format" });
  }

  const token = parts[1];
  if (!token) {
    console.log("No token found after Bearer");
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified, decoded payload:", decoded); // Debug log
    req.user = decoded; // Attach the entire decoded payload to req.user
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};