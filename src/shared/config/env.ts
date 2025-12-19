import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'staging', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(3000),

  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    // eslint-disable-next-line no-console
    console.error('Invalid environment variables');
    // eslint-disable-next-line no-console
    console.error(tree);
    process.exit(1);
  }

  return parsed.data;
}
