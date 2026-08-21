import { AUTH } from '@educi/config';

export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Frame-Options': AUTH.SECURITY_HEADERS.X_FRAME_OPTIONS,
    'X-Content-Type-Options': AUTH.SECURITY_HEADERS.X_CONTENT_TYPE_OPTIONS,
    'Referrer-Policy': AUTH.SECURITY_HEADERS.REFERRER_POLICY,
    'Permissions-Policy': AUTH.SECURITY_HEADERS.PERMISSIONS_POLICY,
    'Strict-Transport-Security': AUTH.SECURITY_HEADERS.HSTS,
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sentry.io https://pay.moneyfusion.net; frame-src 'self' https://pay.moneyfusion.net;",
  };
}

export function applySecurityHeaders(headers: Headers): void {
  const securityHeaders = getSecurityHeaders();
  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }
}
