import express from 'express';
import { buildCustomerRouter } from '../../customer/infrastructure/http/index.js';
import { errorMiddleware } from './error-middleware.js';
import { setupSwagger } from './swagger.js';

export function createApp() {
  const app = express();
  app.use(express.json({ limit: '1mb' })); // 1mb Global

  app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  setupSwagger(app);

  app.use('/api/customers', buildCustomerRouter());
  app.use(errorMiddleware);

  return app;
}
