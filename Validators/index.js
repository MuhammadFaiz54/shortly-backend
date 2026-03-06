const {registerValidation}  = require('./AuthValidations')
const {blogValidation,blogUpdateValidation} = require('./Blog_relatedValidations/blog_val')
const {urlValidation} =require('./UrlValidations')

module.exports = {
  registerValidation,
  urlValidation,
  blogValidation,
  blogUpdateValidation
}