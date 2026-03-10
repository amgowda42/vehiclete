import { Router } from 'express';

import { cars, getCarBrands, getCarById } from '../controller/car.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../middleware/validate.js';
import { carIdSchema, carsQuerySchema } from '../validation/car.validation.js';

const router = Router();

router.get('/', authGuard, validate(carsQuerySchema), cars);
router.get('/brands', authGuard, getCarBrands);
router.get('/:id', authGuard, validate(carIdSchema), getCarById);

export default router;
