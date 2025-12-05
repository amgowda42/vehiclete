import { Router } from 'express';

import { login, signUp } from '../controller/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, signUpSchema } from '../validation/auth.validation.js';

const router = Router();

router.post('/sign-up', validate(signUpSchema), signUp);
router.post('/login', validate(loginSchema), login);

export default router;
