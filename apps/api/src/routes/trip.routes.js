import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware.js';
import * as tripController from '../controllers/trip.controller.js';

const router = Router();

// ─── Schemas ────────────────────────────────────────────────
const planTripSchema = z.object({
  destination: z.string().optional().default(''),
  days: z.number().int().min(1).max(30).optional().default(3),
  preferences: z.string().optional().default(''),
  description: z
    .string()
    .min(5, 'Please describe your trip in at least 5 characters')
    .max(2000),
});

// ─── Routes ─────────────────────────────────────────────────
router.post('/plan', validate(planTripSchema), tripController.planTrip);

export default router;
