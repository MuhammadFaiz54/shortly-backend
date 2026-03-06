const { body } = require('express-validator')


const blogValidation = [
    body('title')
        .notEmpty().withMessage("Please Add Blog Title").bail()
        .isLength({ min: 3 }).withMessage("Please Add a title atleast 3 words"),
    body('content')
        .notEmpty().withMessage("Please Add Blog Content").bail()
        .isLength({ min: 3 }).withMessage("Please Add a valid content"),

]

const blogUpdateValidation = [
    body('blog_id')
        .notEmpty().withMessage("Please pass blog_id in body")
]

module.exports = { blogValidation, blogUpdateValidation }