//routes/api/users.js
// Import the express library

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const checkToken = require('../../config/checkToken');
const updateUserCtrl = require('../../controllers/api/updateUser');


// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

// PUT /api/users/update-profile/:id
router.put('/update-profile/:id', checkToken, updateUserCtrl.updateProfile);

// GET /api/users/profile
router.get('/profile', checkToken, usersCtrl.getUserProfile);

module.exports = router;