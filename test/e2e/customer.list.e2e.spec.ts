import request from 'supertest';
import { createApp } from '../../src/shared/http/create-app.js';
import { Application } from 'express';

describe('List customers by available credit', () => {
  let app: Application;

  beforeEach(() => {
    app = createApp();
  });

  it('lists customers ordered by credit desc', async () => {
    await request(app).post('/api/customers').send({
      name: 'Low',
      email: 'low@test.com',
    });

    const highRes = await request(app).post('/api/customers').send({
      name: 'High',
      email: 'high@test.com',
    });

    const highId = highRes.body.id;

    await request(app)
      .post(`/api/customers/${highId}/credit/add`)
      .send({ amount: 100 });

    const res = await request(app)
      .get('/api/customers')
      .query({ order: 'desc' });

    expect(res.status).toBe(200);
    expect(res.body[0].id).toBe(highId);
  });
});
