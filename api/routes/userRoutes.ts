import { Router } from 'express';

import { getAllUsers, getUsersCount, UpdateUser } from '../controller/user.controller.js';
// import { adminGuard } from '../middleware/adminGuard.js';
import { authGuard } from '../middleware/authGuard.js';

const router = Router();

router.get('/', authGuard, getAllUsers);
router.get('/count', authGuard, getUsersCount);
router.patch('/update/:id', authGuard, UpdateUser);

export default router;
