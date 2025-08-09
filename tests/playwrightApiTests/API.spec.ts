import { test, expect } from '@playwright/test';

test.describe('API Testing Example', () => {

  test('GET request example', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('id', 1);
  });

  test('POST request example', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1
      }
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log(body);

    expect(body).toMatchObject({
      title: 'foo',
      body: 'bar',
      userId: 1
    });
  });

});
