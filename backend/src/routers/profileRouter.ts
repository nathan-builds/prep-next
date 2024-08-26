import express, { Express, Request, Response } from 'express';
import { profileController } from '../controllers/profileController';

const router = express.Router();

router.route('/posts').get(profileController);


export default router;
