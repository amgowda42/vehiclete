import { Router } from 'express';

import { getVehicleStats } from '../controller/vehiclesStats.controller.js';

const router = Router();

router.get('/', getVehicleStats);

export default router;
