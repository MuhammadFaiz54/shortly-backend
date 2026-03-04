const express = require ('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/register',async(req,res)=>{
try {
    console.log("req.body===",req.body)
    const {name,email,password} = req.body;

    const existEmail = await User.findOne({where:{email}})
    if(existEmail){
        return res.status(400).json({message:"Email Already Exist"})
    }
    const passwordHash = await bcrypt.hash(password,10)
    const newUser = await User.create({
        name,
        email,
        password:passwordHash
    })
    return res.status(200).json({message:"Register Successfull",newUser})
} catch (error) {
    return res.status(500).json({message:error.message})
}
})
module.exports = router
