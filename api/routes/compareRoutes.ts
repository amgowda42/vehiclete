import { Router } from 'express';

import { compareVehiclesController } from '../controller/compare.controller.js';
import { authGuard } from '../middleware/authGuard.js';

const router = Router();

router.post('/', authGuard, compareVehiclesController);

export default router;
