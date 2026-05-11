import { Router } from 'express';

const router = Router();

/**
 * API root — service discovery.
 */
router.get('/', (_req, res) => {
  res.json({
    service: 'wanderbuddy-api',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/trips'],
  });
});

// ─── Mount domain routes below ──────────────────────────────
// import tripRoutes from './trip.routes.js';
// router.use('/trips', tripRoutes);

export default router;
