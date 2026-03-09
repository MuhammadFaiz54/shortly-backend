const { validationResult } = require('express-validator')
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const validatError = validationResult(req)
        if (!validatError.isEmpty()) {
            return res.status(400).json({ errors: validatError.array() })
        }
        console.log("req.body===", req.body)
        const { name, email, password } = req.body;

        const existEmail = await User.findOne({ where: { email } })
        if (existEmail) {
            return res.status(400).json({ message: "Email Already Exist" })
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        })
        return res.status(200).json({ message: "Register Successfull", newUser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await User.findOne({ where: { email } })
        if (!existUser) {
            return res.status(404).json({ message: "User not Found" })
        }
        const checkpass = await bcrypt.compare(password, existUser.password)
        if (!checkpass) {
            return res.status(400).json({ message: "Invalid credintials" })
        }
        const token = jwt.sign(
            { id: existUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
        })
        return res.status(200).json({
            message: "Login Successfull", user: {
                id: existUser.id,
                name: existUser.name,
                email: existUser.email,
                accessToken: token
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getProfileController = async (req, res) => {
    try {
        console.log("request---", req.user);
        const id = req.user?.id
        if (!id) {
            return res.status(404).json({ message: 'user not found' })
        }
        const user = await User.findOne({ where: { id } })
        return res.status(200).json({
            message: "Fetch Successfull", user: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
            }
        })
        // const user = await User.findOne
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    registerController,
    loginController,
    getProfileController
}