const express = require ('express')
const authMiddleware = require('../middleware/auth_middleware')
const {blogValidation, blogUpdateValidation} = require('../Validators')
const {blogController, blogUpdateController, allBlogController} = require('../controllers/BlogController/blog_con')
const routes = express.Router()

// Post Protected Routes
routes.post('/blog-add',authMiddleware,blogValidation,blogController)
routes.post('/blog-update',authMiddleware,blogUpdateValidation,blogUpdateController)
routes.post('/blog-delete',authMiddleware,blogValidation,()=>{})
routes.get('/blog-all',authMiddleware,blogValidation,allBlogController)


// Like Protected Routes
routes.post('/like-add', authMiddleware,()=>{})
routes.post('/like-delete', authMiddleware,()=>{})

// Comment Protected Routes
routes.post('/comment-add',authMiddleware,()=>{})
routes.post('/comment-update',authMiddleware,()=>{})
routes.post('/comment-delete',authMiddleware,()=>{})



module.exports= routes
