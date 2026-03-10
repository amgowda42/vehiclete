import { Router } from 'express';

import {
  cycles,
  getCycleBrands,
  getCycleById,
  getCycleCategories,
} from '../controller/cycle.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { validate } from '../middleware/validate.js';
import { cycleIdSchema, cyclesQuerySchema } from '../validation/cycle.validation.js';

const router = Router();

router.get('/', authGuard, validate(cyclesQuerySchema), cycles);
router.get('/brands', authGuard, validate(cyclesQuerySchema), getCycleBrands);
router.get('/categories', authGuard, validate(cyclesQuerySchema), getCycleCategories);
router.get('/:id', authGuard, validate(cycleIdSchema), getCycleById);

export default router;
