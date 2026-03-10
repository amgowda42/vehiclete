import { Router } from 'express';

import { getEmiByVehicle, upsertEmi } from '../controller/emi.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../middleware/validate.js';
import { upsertEmiSchema } from '../validation/emi.validation.js';

const router = Router();
router.post('/', authGuard, validate(upsertEmiSchema), upsertEmi); //if any problem comes put must be used.
router.get('/:vehicleId', authGuard, getEmiByVehicle);

export default router;
