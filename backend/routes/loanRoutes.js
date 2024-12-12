const express = require('express');
const router = express.Router();
const { applyLoan, getLoans } = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/apply-loan', authMiddleware, applyLoan);
router.get('/', authMiddleware, getLoans);

module.exports = router;
