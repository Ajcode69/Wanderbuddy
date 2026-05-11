import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import logger from './utils/logger.js';

const app = express();

// ─── Security & Parsing ─────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.corsOrigins }));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ─────────────────────────────────────────────────
app.use('/api', routes);

// ─── Health Check ───────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'wanderbuddy-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── Error Handling ─────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start ──────────────────────────────────────────────────
app.listen(config.port, () => {
  logger.info(`🚀 WanderBuddy API running on port ${config.port} [${config.nodeEnv}]`);
});

export default app;
