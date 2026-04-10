import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const googleAuth = async(req,res)=>{
    try{

        const {name,email,avatar,} =req.body

        if(!name || !email || !avatar){
            return res.status(404).json({
                message: "email is required"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            user = await User.create({
                name,
                email,
                avatar
            })

            res.status(201).json(
            {
            success:true,
            message: 'User Registered Successfully!!',
            token
            });
        }

        const token = await jwt.sign({_id: this._id},process.env.JWT_SECRET,
            {expiresIn: '3d'});

        res.cookie('token', token,
            {
                 httpOnly: true,
                 sameSite: 'none',
                 secure: false,
                 maxAge: 3 * 24 * 60 * 60 * 1000
            }
        );

        res.status(200).json({
            success: true,
            message: 'User logged-In Successfully',
            token,
        })
    }catch{
        res.status(400).json(
            {
                success: false,
                message: err.message
            }
        )
    }
}



export const logoutUser = async(req,res) =>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
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