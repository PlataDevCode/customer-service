import { describe, it, expect } from '@jest/globals';
import request from 'supertest';

import { createApp } from '../../src/shared/http/create-app';

describe('GET /ping', () => {
  it('returns status ok', async () => {
    const app = createApp();

    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
