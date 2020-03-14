import express from 'express';
const router = express.Router();

import auth from '@controllers/auth'

router.post('/register', auth.register);
router.post('/login', auth.login);

export default router;
