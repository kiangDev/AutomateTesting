import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

test.describe('API Negative tests', () => {
  test('invalid page returns 404', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/nonexistent-12345.html`);
    expect(res.status()).toBe(404);
  });
});
