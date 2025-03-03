require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json({ limit: "10mb" })); // Increase payload limit to 10MB for base64 images

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Routes
const checkToken = require("./config/checkToken");
app.use("/api/users", require("./routes/api/users"));
app.use("/api/movies", checkToken, require("./routes/api/movies"));
app.use("/api/favorites", checkToken, require("./routes/api/movies"));

// Catch-all route for React app
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});