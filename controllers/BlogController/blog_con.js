const { validationResult } = require("express-validator")
const { Blog } = require("../../models/Blog")

const blogController = async (req, res) => {
    try {
        const id = req.user?.id
        if (!id) {
            return res.status(401).json({ message: "unauthenticated" })
        }
        const checkValidation = validationResult(req)
        if (!checkValidation.isEmpty()) {
            return res.status(400).json({ errors: checkValidation.array() })
        }
        const { title, content, } = req.body
        const adBlg = await Blog.create({
            title, author: id, content
        })
        return res.status(201).json({ message: "Blog Create Successfully", adBlg })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const blogUpdateController = async (req, res) => {
    try {
        const id = req.user?.id
        if (!id) {
            return res.status(401).json({ message: "unauthenticated" })
        }
        const checkValidation = validationResult(req)
        if (!checkValidation.isEmpty()) {
            return res.status(400).json({ errors: checkValidation.array() })
        }
        const blogInfo = req.body
        const blogId = blogInfo.blog_id
        const blog = await Blog.findById(blogId)

        if (!blog) {
            return res.status(400).json({ message: "This is not your blog" })
        }
        if (blog.author !== id) {
            return res.status(403).json({ message: "This is not your blog" })

        }
        blog.title = blog.title || blogInfo
        blog.content = blog.content || blogInfo
        await blog.save()

        return res.status(200).json({ message: "Blog updated Successfully", blog })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const allBlogController = async (req,res)=>{
    try {
        const allBlogs = await Blog.find({})
        return res.status(200).json({ message: "All Blog Fetch Successfully", allBlogs })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    blogController,
    blogUpdateController,
    allBlogController
}