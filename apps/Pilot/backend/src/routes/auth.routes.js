import { Router } from 'express';
import { googleSignIn, logout, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/requireAuth.js';

export const authRouter = Router();

authRouter.post('/google', googleSignIn);
authRouter.get('/me', requireAuth, me);
authRouter.post('/logout', logout);
