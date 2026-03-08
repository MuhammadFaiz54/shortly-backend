const {body} = require ('express-validator')

const roleAssignValidator = [
    body('user_id')
    .notEmpty().withMessage("User Id must be required"),

    body('role_id')
    .notEmpty().withMessage("Role Id must be required")
    
]

module.exports = {
    roleAssignValidator
}