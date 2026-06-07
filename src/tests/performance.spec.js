import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

// ตรวจ response time เบื้องต้นว่าไม่ช้าเกินไป
test.describe('API Performance tests', () => {
  // วัดเวลา request GET homepage
  // ตรวจ status 200
  // ตรวจ duration < 5000 ms
  test('homepage responds within 5 seconds', async ({ request }) => {
    const startTime = Date.now();
    const res = await request.get(BASE_URL);
    const duration = Date.now() - startTime;

    expect(res.status()).toBe(200);
    expect(duration).toBeLessThan(5000);
  });
});
