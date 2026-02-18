import { Router } from 'express';

import { getVehicleById } from '../controller/vehicle.controller.js';

const router = Router();

router.get('/:id', getVehicleById);

export default router;
