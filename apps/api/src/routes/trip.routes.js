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

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1),
      }),
    )
    .min(1, 'At least one message is required')
    .max(50, 'Too many messages'),
});

// ─── Routes ─────────────────────────────────────────────────
router.post('/plan', validate(planTripSchema), tripController.planTrip);
router.post('/chat', validate(chatSchema), tripController.chat);

export default router;
