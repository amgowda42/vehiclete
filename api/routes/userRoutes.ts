import { Router } from 'express';

import { getAllUsers, getUsersCount } from '../controller/user.controller.js';
// import { adminGuard } from '../middleware/adminGuard.js';
import { authGuard } from '../middleware/authGuard.js';

const router = Router();

router.get('/', authGuard, getAllUsers);
router.get('/count', authGuard, getUsersCount);

export default router;
