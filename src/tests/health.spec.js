import { test, expect } from '@playwright/test';
import { BASE_URL, ASSET_TIMEOUT_MS, buildAssetUrl } from './api-helpers.js';

// ตรวจสุขภาพของเว็บ ทั้ง asset และไฟล์สาธารณะ เช่น robots.txt
test.describe('API Health tests', () => {
  // โหลด homepage
  // หา URL ของ stylesheet หรือ script แรกจาก HTML
  // ตรวจว่า URL นั้นโหลดได้ด้วย status 200
  test('first linked stylesheet or script returns 200', async ({ request }) => {
    const res = await request.get(BASE_URL);
    const body = await res.text();
    const fullUrl = buildAssetUrl(body);

    expect(fullUrl).not.toBeNull();

    const assetRes = await request.get(fullUrl, { timeout: ASSET_TIMEOUT_MS });
    expect(assetRes.status()).toBe(200);
  });

  // โหลด /robots.txt
  // ตรวจ status 200
  // ตรวจเนื้อหาในไฟล์มีคำว่า User-agent
  test('robots.txt exists and contains User-agent', async ({ request }) => {
    const robotsRes = await request.get(`${BASE_URL}/robots.txt`);
    expect(robotsRes.status()).toBe(200);
    const body = await robotsRes.text();
    expect(body).toContain('User-agent');
  });
});
