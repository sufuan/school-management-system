const express = require('express')
const { registerStudents, getstudent, login } = require('../controllers/admission')
const { protect } = require('../middleware/admission')
const router = express.Router()



router.route('/admission').post(registerStudents)
router.route('/login').post(login)
router.route('/admission').get(protect, getstudent)

module.exports = router