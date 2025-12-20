import { createRequire } from 'node:module';
import { loadEnv } from './shared/config/env.js';
import { overrideConsole } from './shared/logger/console-override.js';
import { createApp } from './shared/http/create-app.js';

const cjsRequire = createRequire(import.meta.url);
const serverlessExpress = cjsRequire('@vendia/serverless-express');

loadEnv();
overrideConsole();

export const handler = serverlessExpress({
  app: createApp(),
});
