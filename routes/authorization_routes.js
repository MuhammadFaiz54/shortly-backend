const express = require('express')
const authorizationF = require('../controllers/authorization_controller')
const authMiddleware = require('../middleware/auth_middleware')
const { roleAssignValidator } = require('../Validators/AuthorizationValidations/role_assignValidation')
const authorization_route = express.Router()

authorization_route.post('/assign',authMiddleware,roleAssignValidator,authorizationF)

module.exports = authorization_route