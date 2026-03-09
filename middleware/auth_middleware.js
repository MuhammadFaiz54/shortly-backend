const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) => {
    try {
        // const token = req?.headers?.authorization?.split(' ')[1]
        const token = req.cookie.token
    console.log("token===",token);
    
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decode
    
    next()
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
    
}

module.exports = authMiddleware