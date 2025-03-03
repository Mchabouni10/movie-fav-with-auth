// ----------------------------------------------Requires
// Always require and configure near the top
require("dotenv").config();
// Connect to the database
require("./config/database");

const express = require("express");
const path = require("path");
const logger = require("morgan"); // JSON request
const port = process.env.PORT || 3001;
const app = express();

// ----------------------------------------------Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// ----------------------------------------------Routes
// Middleware to verify token and assign user object of payload to req.user.
const checkToken = require('./config/checkToken');

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/movies', checkToken, require('./routes/api/movies')); 
app.use('/api/favorites', checkToken, require('./routes/api/movies')); 

// Other middleware and routes

// Catch-all route for serving React app
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ----------------------------------------------Server
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});