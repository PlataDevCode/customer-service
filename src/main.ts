import { createApp } from './shared/http/create-app.js';
import { logger } from './shared/logger/logger.js';

logger.info('LOGGER BOOTSTRAP');

const app = createApp();

app.listen(3000, () => {
  logger.info('Server running on port 3000');
});
