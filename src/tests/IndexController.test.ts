import request from 'supertest';
import { app } from '../app';

describe('GET / endpoint test', () => {
  it('Should return status code 200', async () => {
    const result = await request(app).get('/').send();
    expect(result.status).toBe(200);
  });
});
