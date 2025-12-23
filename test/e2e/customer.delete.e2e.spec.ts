import request from 'supertest';
import { createApp } from '../../src/shared/http/create-app.js';
import { Application } from 'express';

describe('Delete customer', () => {
  let app: Application;

  beforeEach(() => {
    app = createApp();
  });

  it('deletes a customer', async () => {
    const createRes = await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'alex@test.com',
    });

    const customerId = createRes.body.id;

    const res = await request(app).delete(`/api/customers/${customerId}`);

    expect(res.status).toBe(200);
  });
});
