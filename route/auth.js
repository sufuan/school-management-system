const express = require('express');
const { register, login } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();


router.route('/api/user/register').post(register)
router.route('/api/user/login').post(login)










module.exports = router;