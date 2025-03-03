//routes/api/users.js
const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const checkToken = require("../../config/checkToken");
const updateUserCtrl = require("../../controllers/api/updateUser");

// Routes
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.put("/update-profile/:id", checkToken, updateUserCtrl.updateProfile); 
router.get("/profile", checkToken, usersCtrl.getUserProfile);
router.delete("/profile", checkToken, usersCtrl.deleteProfile);

module.exports = router;
