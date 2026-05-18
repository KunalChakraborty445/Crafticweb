import express from 'express';
import { isAuthUser } from '../middlewares/isAuth.js';
import { billingController } from '../controllers/billing.controller.js';


const billingRouter = express.Router();

billingRouter.post('/',isAuthUser, billingController)



export default billingRouter