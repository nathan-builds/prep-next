import express from 'express';
import { register } from '../controllers/registerController';

const router = express.Router();

router.post('/user', register);

export default router;