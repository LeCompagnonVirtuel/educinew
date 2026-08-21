import type { NextRequest } from 'next/server';
import { WEBHOOK_EXEMPT_PREFIXES } from '@educi/config';

export function checkCSRF(request: NextRequest): Response | null {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/api/')) return null;
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) return null;

  const isWebhook = (WEBHOOK_EXEMPT_PREFIXES as readonly string[]).some((p) => pathname.startsWith(p));
  if (isWebhook) return null;

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (!origin || !host) {
    return Response.json({ error: 'CSRF validation failed: missing Origin' }, { status: 403 });
  }

  try {
    const originUrl = new URL(origin);
    if (originUrl.host !== host) {
      return Response.json({ error: 'CSRF validation failed' }, { status: 403 });
    }
  } catch {
    return Response.json({ error: 'CSRF validation failed: invalid Origin' }, { status: 403 });
  }

  return null;
}
