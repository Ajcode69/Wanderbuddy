import { Router } from 'express';
import tripRoutes from './trip.routes.js';

const router = Router();

/**
 * API root — service discovery.
 */
router.get('/', (_req, res) => {
  res.json({
    service: 'wanderbuddy-api',
    version: '1.0.0',
    endpoints: ['/api/trips/plan'],
  });
});

// ─── Domain Routes ──────────────────────────────────────────
router.use('/trips', tripRoutes);

export default router;
