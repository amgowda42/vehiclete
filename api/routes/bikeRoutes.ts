import { Router } from 'express';

import { bikes, getBikeBrands, getBikeById } from '../controller/bike.controller.js';
import { validate } from '../middleware/validate.js';
import { bikeIdSchema, bikesQuerySchema } from '../validation/bike.validation.js';

const router = Router();

router.get('/', validate(bikesQuerySchema), bikes);
router.get('/brands', getBikeBrands);
router.get('/:id', validate(bikeIdSchema), getBikeById);

export default router;
