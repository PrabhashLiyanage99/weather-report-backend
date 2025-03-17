const express = require('express');
const { registerUser, updateLocation } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.put('/update-location',updateLocation);

module.exports = router;