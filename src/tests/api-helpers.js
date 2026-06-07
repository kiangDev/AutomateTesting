export const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';
export const ASSET_TIMEOUT_MS = 5000;

// หา URL ของ href หรือ src จาก HTML และแปลงเป็น URL เต็มโดยใช้ BASE_URL เป็นฐาน
// เช่นหา href="/style.css" เอา "/style.css"
export function extractAssetUrl(html, attribute) {
  const regex = new RegExp(`${attribute}=["']([^"']+)["']`, 'i');
  const match = regex.exec(html);
  return match ? match[1] : null;
}

// รับ URL มาแล้วแปลงเป็น Absolute URL
// เช่น assetUrl = "/style.css" BASE_URL = https://www.saucedemo.com
// ได้ https://www.saucedemo.com/style.css
export function resolveUrl(assetUrl) {
  try {
    return new URL(assetUrl, BASE_URL).href;
  } catch {
    return null;
  }
}

// หา URL จาก HTML ก่อนแล้วค่อยเรียก resolveUrl()
// เช่น <link rel="stylesheet" href="/style.css">
// หา "/style.css" แปลงเป็น "https://www.saucedemo.com/style.css"
// https://www.saucedemo.com/style.css
export function buildAssetUrl(html) {
  const assetUrl = extractAssetUrl(html, 'href') || extractAssetUrl(html, 'src');
  return assetUrl ? resolveUrl(assetUrl) : null;
}
