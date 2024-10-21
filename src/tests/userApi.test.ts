import request from 'supertest';
import app from '../index';

describe('User API', () => {
  it('should return empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'John',
      age: 25,
      hobbies: ['reading', 'gaming']
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
  
  // Add more test cases for GET, PUT, DELETE
});
