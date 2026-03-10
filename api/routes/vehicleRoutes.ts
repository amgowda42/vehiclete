import { Router } from 'express';

import { getVehicleById } from '../controller/vehicle.controller.js';
import { authGuard } from '../middleware/authGuard.js';

const router = Router();

router.get('/:id', authGuard, getVehicleById);

export default router;
