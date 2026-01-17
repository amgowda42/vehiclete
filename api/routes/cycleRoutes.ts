import { Router } from 'express';

import {
  cycles,
  getCycleBrands,
  getCycleById,
  getCycleCategories,
} from '../controller/cycle.controller.js';
import { validate } from '../middleware/validate.js';
import { cycleIdSchema, cyclesQuerySchema } from '../validation/cycle.validation.js';

const router = Router();

router.get('/', validate(cyclesQuerySchema), cycles);
router.get('/brands', validate(cyclesQuerySchema), getCycleBrands);
router.get('/categories', validate(cyclesQuerySchema), getCycleCategories);
router.get('/:id', validate(cycleIdSchema), getCycleById);

export default router;
