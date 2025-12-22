import { Router } from 'express';

import { bikes } from '../controller/bike.controller.js';

const router = Router();

router.get('/', bikes);

export default router;
