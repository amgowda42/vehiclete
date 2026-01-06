import { Router } from 'express';

import { cycles, getCycleById } from '../controller/cycle.controller.js';
import { validate } from '../middleware/validate.js';
import { cycleIdSchema } from '../validation/cycle.validation.js';

const router = Router();

router.get('/', cycles);

router.get('/:id', validate(cycleIdSchema), getCycleById);

export default router;
