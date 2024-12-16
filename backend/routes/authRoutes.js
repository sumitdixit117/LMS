const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/users/:id', authMiddleware, updateUser);

module.exports = router;
