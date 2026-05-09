import express from 'express';

import { isAuthUser } from '../middlewares/isAuth.js';
import { changes, deploy, generateWebsite, getAllWebsites, getUserWebsiteById, getWebsiteBySlug } from '../controllers/website.controller.js';


const websiteRouter = express.Router();

websiteRouter.post('/generate',isAuthUser, generateWebsite)
websiteRouter.post('/updateWeb/:id',isAuthUser, changes)
websiteRouter.get('/getWebsite-by-id/:id',isAuthUser, getUserWebsiteById)
websiteRouter.get('/getAllWebsite',isAuthUser, getAllWebsites)
websiteRouter.get('/deploy/:id',isAuthUser, deploy)
websiteRouter.get('/getWebsite-by-slug/:slug',getWebsiteBySlug)



export default websiteRouter;