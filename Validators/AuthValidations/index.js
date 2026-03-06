const {body} = require('express-validator')

const registerValidation = [
    body('name').notEmpty().withMessage("Please Enter Name").isString().withMessage("Name must be string").isLength({min:4}).withMessage("Enter a valid name"),
    body('email').notEmpty().withMessage("Please Enter Email").isEmail().withMessage("Enter a valid email"),
    body('password').notEmpty().withMessage('Please Enter Password').isString().withMessage("Password must ba a string").isLength({min:6}).withMessage("Password length must be 6")
  ]
  module.exports={
    registerValidation,
  }