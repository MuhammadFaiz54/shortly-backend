const {body} = require('express-validator')

const urlValidation = [
    body('url').notEmpty().withMessage("Please Enter URL").isURL({require_protocol:true}).withMessage("Enter a valid url")
]
  module.exports={
    urlValidation
  }