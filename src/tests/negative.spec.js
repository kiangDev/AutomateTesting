import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

// ตรวจว่าเว็บตอบผิดพลาดถูกต้อง ไม่ใช่คืนหน้า error 200 แบบปลอมๆ
test.describe('API Negative tests', () => {
  // GET URL ที่ไม่มีจริง เช่น /nonexistent-12345.html
  // ตรวจว่า status เป็น 404
  test('invalid page returns 404', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/nonexistent-12345.html`);
    expect(res.status()).toBe(404);
  });
});
