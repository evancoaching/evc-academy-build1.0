/** Shared Apps Script webhook for 2-way student/lesson sync */

const STORAGE_KEY = 'evan_coaching_webhook_url';

export function getWebhookUrl(): string {
  const fromEnv = (import.meta as any).env?.VITE_APPS_SCRIPT_WEBHOOK_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.trim();
  }
  try {
    return (localStorage.getItem(STORAGE_KEY) || '').trim();
  } catch {
    return '';
  }
}

export function setWebhookUrl(url: string): void {
  const clean = url.trim();
  if (clean) {
    localStorage.setItem(STORAGE_KEY, clean);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}
