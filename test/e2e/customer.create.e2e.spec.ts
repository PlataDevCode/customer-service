import request from 'supertest';
import { createApp } from '../../src/shared/http/create-app.js';
import { Application } from 'express';

describe('Create customer', () => {
  let app: Application;

  beforeEach(() => {
    app = createApp();
  });

  it('creates a customer successfully', async () => {
    const res = await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'alex@test.com',
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      name: 'Alex',
      email: 'alex@test.com',
      availableCredit: 0,
    });
    expect(res.body.id).toBeDefined();
  });

  it('returns 400 when email is invalid', async () => {
    const res = await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'invalid-email',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('code', 'VALIDATION_ERROR');
  });

  it('returns 409 when email already exists', async () => {
    await request(app).post('/api/customers').send({
      name: 'Alex',
      email: 'alex@test.com',
    });

    const res = await request(app).post('/api/customers').send({
      name: 'Other',
      email: 'alex@test.com',
    });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('code', 'CONFLICT');
  });
});
