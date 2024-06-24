import express from 'express';
const router = express.Router();

import userRouter from '../controllers/user.controller.js'

router.route('/').get(userRouter);

export default router;