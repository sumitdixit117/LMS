const express = require('express');
const router = express.Router();
const { register, login, updateUser, forgotPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/users/:id', authMiddleware, updateUser);
router.post('/forgot', forgotPassword);

module.exports = router;
