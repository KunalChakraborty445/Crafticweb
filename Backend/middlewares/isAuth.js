import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';



export const isAuthUser = async(req, res, next) => {


     const token = req.cookies?.token ||
        req.headers.authorization?.split(' ')[1]; 

         if(!token){
        return res.json({ success:false, message:'Not authorized, Login again'})
        }

    try{

        const  decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decode._id);

        next();
       

       
    }catch(err){
       res.json({success:false, message: err.message})
    }
}