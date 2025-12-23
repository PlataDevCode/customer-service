import serverless from 'serverless-http';
import { loadEnv } from './shared/config/env.js';
import { overrideConsole } from './shared/logger/console-override.js';
import { createApp } from './shared/http/create-app.js';

loadEnv();
overrideConsole();

const app = createApp();

export const handler = serverless(app);
