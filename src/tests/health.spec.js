import { test, expect } from '@playwright/test';
import { BASE_URL, ASSET_TIMEOUT_MS, buildAssetUrl } from './api-helpers.js';

test.describe('API Health tests', () => {
  test('first linked stylesheet or script returns 200', async ({ request }) => {
    const res = await request.get(BASE_URL);
    const body = await res.text();
    const fullUrl = buildAssetUrl(body);

    expect(fullUrl).not.toBeNull();

    const assetRes = await request.get(fullUrl, { timeout: ASSET_TIMEOUT_MS });
    expect(assetRes.status()).toBe(200);
  });

  test('robots.txt exists and contains User-agent', async ({ request }) => {
    const robotsRes = await request.get(`${BASE_URL}/robots.txt`);
    expect(robotsRes.status()).toBe(200);
    const body = await robotsRes.text();
    expect(body).toContain('User-agent');
  });
});
