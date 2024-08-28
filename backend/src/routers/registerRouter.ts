import express from 'express';
import { file, register } from '../controllers/registerController';

const router = express.Router();

router.post('/user', register);
router.post('/file', file);

export default router;