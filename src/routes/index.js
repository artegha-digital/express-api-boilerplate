import express from 'express';
const router = express.Router();

import auth from '@routes/auth'

router.use('/auth', auth)

export default router;
