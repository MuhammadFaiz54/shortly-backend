const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
    },
    author: {
        type: Number,
        // required: true
    },
    content: {
        type: String,
        // required: true
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog',BlogSchema)

const CommentSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const comment = mongoose.model('Comment',CommentSchema)

const LikeSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})
const like = mongoose.model('Like',LikeSchema)

module.exports={
    Blog,
    comment,
    like
}