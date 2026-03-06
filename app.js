const express = require('express')
const auth_router = require('./routes/auth_routes')
const url_router = require('./routes/url_routes')
const blog_router = require('./routes/blog_routes')
 const app = express()

app.use(express.json())

app.use('/api/user',auth_router)
app.use('/api/url',url_router)
app.use('/api/blog',blog_router)

module.exports = app