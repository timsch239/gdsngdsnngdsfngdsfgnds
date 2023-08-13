const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { mail, password } = req.body

    try {
        const user = await User.login(mail, password)

        const token = createToken(user._id)

        res.status(200).json({ mail, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { mail, password } = req.body

    try {
        const user = await User.signup(mail, password)

        const token = createToken(user._id)

        res.status(201).json({ mail, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }