import request from 'supertest';
import { createApp } from '../../src/shared/http/create-app.js';
import { Application } from 'express';

describe('Customer credit operations', () => {
  let app: Application;

  beforeEach(() => {
    app = createApp();
  });

  it('adds credit to customer', async () => {
    const createRes = await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'alex@test.com',
    });

    const customerId = createRes.body.id;

    const res = await request(app)
      .post(`/api/customers/${customerId}/credit/add`)
      .send({ amount: 50 });

    expect(res.status).toBe(200);
    expect(res.body.availableCredit).toBe(50);
  });

  it('returns conflict when credit is insufficient', async () => {
    const createRes = await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'alex@test.com',
    });

    const customerId = createRes.body.id;

    const res = await request(app)
      .post(`/api/customers/${customerId}/credit/subtract`)
      .send({ amount: 10 });

    expect(res.status).toBe(409);
    expect(res.body.code).toBe('CONFLICT');
  });
});
