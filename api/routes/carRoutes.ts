import { Router } from 'express';

import { cars, getCarById } from '../controller/car.controller.js';
import { validate } from '../middleware/validate.js';
import { carIdSchema } from '../validation/car.validation.js';

const router = Router();

router.get('/', cars);
router.get('/:id', validate(carIdSchema), getCarById);

export default router;
