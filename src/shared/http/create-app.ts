import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json({ limit: '1mb' })); // 1mb Global

  app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
}
