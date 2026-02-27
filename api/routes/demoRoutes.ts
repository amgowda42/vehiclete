import { Router } from 'express';

import {
  bookDemo,
  getAllDemoBookings,
  updateDemoStatus,
} from '../controller/demoBooking.controller.js';
import { authGuard } from '../middleware/authGuard.js';

const router = Router();

router.post('/', authGuard, bookDemo);
router.get('/bookings', getAllDemoBookings);
router.patch('/:bookingId/status', updateDemoStatus);

export default router;
