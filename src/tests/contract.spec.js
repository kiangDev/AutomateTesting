import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

test.describe('API Contract tests', () => {
  test('homepage title contains Swag Labs', async ({ request }) => {
    const res = await request.get(BASE_URL);
    const body = await res.text();
    expect(body).toContain('<title>Swag Labs</title>');
  });

  test('page headers include content-type and cache-control', async ({ request }) => {
    const res = await request.get(BASE_URL);
    expect(res.headers()['content-type']).toBeDefined();
    expect(res.headers()['cache-control']).toBeDefined();
  });
});
