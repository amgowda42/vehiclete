import { Router } from 'express';

import { upload } from '../config/cloudinary.js';
import {
  bikes,
  createBike,
  updateBike,
  deleteBike,
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

// Update bike with optional image upload
router.put(
  '/:id',
  upload.single('image'), // This expects a form field named "image"
  updateBike
);

// Delete bike
router.delete('/:id', deleteBike);

export default router;
