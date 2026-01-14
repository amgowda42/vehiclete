import { Router } from 'express';

import { cars, getCarBrands, getCarById } from '../controller/car.controller.js';
import { validate } from '../middleware/validate.js';
import { carIdSchema, carsQuerySchema } from '../validation/car.validation.js';

const router = Router();

router.get('/', validate(carsQuerySchema), cars);
router.get('/brands', getCarBrands);
router.get('/:id', validate(carIdSchema), getCarById);

export default router;
