import serverlessExpress from '@vendia/serverless-express';
import { loadEnv } from './shared/config';
import { overrideConsole } from './shared/logger/console-override';
import { createApp } from './shared/http/create-app';

loadEnv();
overrideConsole();

export const handler = serverlessExpress({
  app: createApp(),
});
