import express from 'express';

import { isAuthUser } from '../middlewares/isAuth.js';
import { generateWebsite, getUserWebsiteById } from '../controllers/website.controller.js';


const websiteRouter = express.Router();

websiteRouter.post('/generate',isAuthUser, generateWebsite)
websiteRouter.get('/getWebsite-by-id/:id',isAuthUser, getUserWebsiteById)



export default websiteRouter;