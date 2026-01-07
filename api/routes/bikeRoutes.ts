import { Router } from 'express';

import { upload } from '../config/cloudinary.js';
import {
  bikes,
  createBike,

  getBikeById,
} from '../controller/bike.controller.js';
import { validate } from '../middleware/validate.js';
import { bikeIdSchema } from '../validation/bike.validation.js';

const router = Router();

router.get('/', bikes);

router.get('/:id', validate(bikeIdSchema), getBikeById);

router.post(
  '/',
  upload.single('image'), // This expects a form field named "image"
  createBike
);

// Update bike with optional image up

export default router;
