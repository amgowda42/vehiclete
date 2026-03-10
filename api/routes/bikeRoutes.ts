import { Router } from 'express';

import { bikes, getBikeBrands, getBikeById } from '../controller/bike.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../middleware/validate.js';
import { bikeIdSchema, bikesQuerySchema } from '../validation/bike.validation.js';

const router = Router();

router.get('/', authGuard, validate(bikesQuerySchema), bikes);
router.get('/brands', authGuard, getBikeBrands);
router.get('/:id', authGuard, validate(bikeIdSchema), getBikeById);

export default router;