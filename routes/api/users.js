// users in route 

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const checkToken = require('../../config/checkToken');

// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

// GET /api/users/profile
router.get('/profile', checkToken, usersCtrl.getUserProfile);

module.exports = router;