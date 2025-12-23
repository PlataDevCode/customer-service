import request from 'supertest';
import { createApp } from '../../src/shared/http/create-app.js';
import { Application } from 'express';

describe('Get customer by id', () => {
 let app: Application;

   beforeEach(() => {
     app = createApp();
   });

  it('returns a customer when exists', async () => {
    const createRes = await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'alex@test.com',
    });

    const customerId = createRes.body.id;

    const res = await request(app).get(`/api/customers/${customerId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(customerId);
  });

  it('returns 404 when customer does not exist', async () => {
    const res = await request(app).get('/api/customers/non-existing-id');

    expect(res.status).toBe(404);
    expect(res.body.code).toBe('NOT_FOUND');
  });
});
