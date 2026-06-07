import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

test.describe('API Smoke tests', () => {
  test('GET / returns 200 and HTML content', async ({ request }) => {
    const res = await request.get(BASE_URL);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/html');
  });
});
