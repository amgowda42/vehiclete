import { Router } from 'express';

import { getVehicleStats } from '../controller/vehiclesStats.controller.js';
import { authGuard } from '../middleware/authGuard.js';

const router = Router();

router.get('/', authGuard, getVehicleStats);

export default router;
