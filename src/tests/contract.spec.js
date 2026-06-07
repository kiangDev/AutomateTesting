import { test, expect } from '@playwright/test';
import { BASE_URL } from './api-helpers.js';

// ตรวจโครงสร้าง response / contract ว่าออกมาตามที่คาด
test.describe('API Contract tests', () => {
  // ตรวจ HTML ว่ามี <title>Swag Labs</title>
  test('homepage title contains Swag Labs', async ({ request }) => {
    const res = await request.get(BASE_URL);
    const body = await res.text();
    expect(body).toContain('<title>Swag Labs</title>');
  });

  // ตรวจ header ว่า content-type กับ cache-control มีอยู่ไหม
  test('page headers include content-type and cache-control', async ({ request }) => {
    const res = await request.get(BASE_URL);
    expect(res.headers()['content-type']).toBeDefined();
    expect(res.headers()['cache-control']).toBeDefined();
  });
});
