import { Router } from 'express';

import { authCheck, login, logout, refreshToken, signUp } from '../controller/auth.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, signUpSchema } from '../validation/auth.validation.js';

const router = Router();

router.post('/sign-up', validate(signUpSchema), signUp);
router.post('/login', validate(loginSchema), login);
router.get('/authCheck', authGuard, authCheck);
router.post('/refresh-token', refreshToken);
router.post('/logout', authGuard, logout);

export default router;
