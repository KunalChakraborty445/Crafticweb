import express from 'express';

import { isAuthUser } from '../middlewares/isAuth.js';
import { changes, generateWebsite, getAllWebsites, getUserWebsiteById } from '../controllers/website.controller.js';


const websiteRouter = express.Router();

websiteRouter.post('/generate',isAuthUser, generateWebsite)
websiteRouter.post('/updateWeb/:id',isAuthUser, changes)
websiteRouter.get('/getWebsite-by-id/:id',isAuthUser, getUserWebsiteById)
websiteRouter.get('/getAllWebsite',isAuthUser, getAllWebsites)



export default websiteRouter;