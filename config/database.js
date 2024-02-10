// database.js
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

db.on("error", function (err) {
  console.error("MongoDB connection error:", err);
});

module.exports = mongoose; 
