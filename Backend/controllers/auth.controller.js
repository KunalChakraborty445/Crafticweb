import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign(
    { _id: id },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
)

const cookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 3 * 24 * 60 * 60 * 1000
}

export const googleAuth = async (req, res) => {
    try {
        const { name, email, avatar } = req.body

        if (!name || !email || !avatar) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await User.findOne({ email })
        let isNewUser = false

        if (!user) {
            user = await User.create({ name, email, avatar })
            isNewUser = true
        }

        const token = generateToken(user._id)

        res.cookie('token', token, cookieOptions)

        res.status(isNewUser ? 201 : 200).json({
            success: true,
            message: isNewUser ? 'User Registered Successfully!' : 'User logged in successfully',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}