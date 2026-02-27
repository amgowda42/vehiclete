import { Router } from 'express';

import { getEmiByVehicle, upsertEmi } from '../controller/emi.controller.js';
import { validate } from '../middleware/validate.js';
import { upsertEmiSchema } from '../validation/emi.validation.js';

const router = Router();
router.post('/', validate(upsertEmiSchema), upsertEmi); //if any problem comes put must be used.
router.get('/:vehicleId', getEmiByVehicle);

export default router;
