const express = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const { registerValidation } = require('../Validators');
const { registerController, loginController, getProfileController } = require('../controllers/auth_controller');
router = express.Router()




router.post('/register', registerValidation, registerController)

router.post('/login', loginController)

router.get('/profile', authMiddleware, getProfileController)
module.exports = router
