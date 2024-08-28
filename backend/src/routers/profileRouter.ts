import express, { Express, Request, Response } from 'express';
import { newPostController, profileController } from '../controllers/profileController';
import { protectRoute } from '../middleware/authorizeRoute';

const router = express.Router();

router.route('/posts').get(protectRoute, profileController);
router.route('/new-post').post(newPostController)


export default router;
