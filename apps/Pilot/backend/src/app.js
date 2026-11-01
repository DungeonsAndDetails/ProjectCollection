import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { sessionMiddleware } from './config/session.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';

const dbStatusByReadyState = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export const app = express();

// Explicit origin + credentials (not a wildcard) — required for the session
// cookie to actually be sent/set cross-origin between the Vite dev server and this API.
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(sessionMiddleware);

app.get('/api/health', (req, res) => {
  res.json({
    data: {
      status: 'ok',
      project: 'pilot-backend',
      db: dbStatusByReadyState[mongoose.connection.readyState],
    },
  });
});

app.use('/api/auth', authRouter);

app.use(errorHandler);
