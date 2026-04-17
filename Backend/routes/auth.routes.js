import express from 'express';
import { googleAuth, logoutUser } from '../controllers/auth.controller.js';
import { isAuthUser } from '../middlewares/isAuth.js';


const authRouter = express.Router();


authRouter.post('/register', googleAuth);

authRouter.get('/logout', logoutUser)



export default authRouter