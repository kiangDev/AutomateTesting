import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

test.describe('API Performance tests', () => {
  test('homepage responds within 5 seconds', async ({ request }) => {
    const startTime = Date.now();
    const res = await request.get(BASE_URL);
    const duration = Date.now() - startTime;

    expect(res.status()).toBe(200);
    expect(duration).toBeLessThan(5000);
  });
});
