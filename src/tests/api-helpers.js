// รวม BASE_URL แบบอ่านจาก process.env.BASE_URL
// ฟังก์ชันช่วย extractAssetUrl(), resolveUrl(), buildAssetUrl()
// ตั้งค่า timeout สำหรับ asset เป็น 5000ms

export const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';
export const ASSET_TIMEOUT_MS = 5000;

export function extractAssetUrl(html, attribute) {
  const regex = new RegExp(`${attribute}=["']([^"']+)["']`, 'i');
  const match = regex.exec(html);
  return match ? match[1] : null;
}

export function resolveUrl(assetUrl) {
  try {
    return new URL(assetUrl, BASE_URL).href;
  } catch {
    return null;
  }
}

export function buildAssetUrl(html) {
  const assetUrl = extractAssetUrl(html, 'href') || extractAssetUrl(html, 'src');
  return assetUrl ? resolveUrl(assetUrl) : null;
}
