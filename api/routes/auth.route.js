import express from 'express';
const router = express.Router();

import authRouter from '../controllers/auth.controller.js'

router.route('/signup').post(authRouter)

export default router;