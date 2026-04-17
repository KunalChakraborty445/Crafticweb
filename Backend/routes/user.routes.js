import express from 'express';
import { getCurrentUser } from '../controllers/user.controller.js';
import { isAuthUser } from '../middlewares/isAuth.js';


const userRouter = express.Router();

userRouter.get('/me',isAuthUser, getCurrentUser)



export default userRouter