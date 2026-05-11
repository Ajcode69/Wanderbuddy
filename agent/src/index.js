import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4100;

// ─── Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// ─── Health ─────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'wanderbuddy-agent',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── Agent Routes ───────────────────────────────────────────
// POST /agent/plan — invoke the travel planning workflow
app.post('/agent/plan', async (req, res) => {
  try {
    const { destination, days, preferences } = req.body;

    // TODO: Wire up LangGraph workflow from ./workflows/
    res.json({
      success: true,
      data: {
        message: `Planning ${days}-day trip to ${destination}`,
        status: 'workflow_pending',
      },
    });
  } catch (error) {
    console.error('[AGENT ERROR]', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🤖 WanderBuddy Agent running on port ${PORT}`);
});

export default app;
