import type { AuthSession } from '../types';
import { AUTH } from '@educi/config';
import { logger } from '@educi/logger';

export class TokenService {
  decodePayload(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  isExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload || typeof payload.exp !== 'number') return true;
    return payload.exp * 1000 < Date.now();
  }

  getTimeUntilExpiry(token: string): number {
    const payload = this.decodePayload(token);
    if (!payload || typeof payload.exp !== 'number') return 0;
    return Math.max(0, payload.exp * 1000 - Date.now());
  }

  shouldRefresh(session: AuthSession): boolean {
    const timeUntilExpiry = this.getTimeUntilExpiry(session.accessToken);
    const refreshThreshold = AUTH.SESSION.PROACTIVE_REFRESH_MINUTES * 60 * 1000;
    return timeUntilExpiry < refreshThreshold;
  }

  extractUserId(token: string): string | null {
    const payload = this.decodePayload(token);
    if (!payload || typeof payload.sub !== 'string') return null;
    return payload.sub;
  }

  extractEmail(token: string): string | null {
    const payload = this.decodePayload(token);
    if (!payload || typeof payload.email !== 'string') return null;
    return payload.email;
  }

  generateDeviceId(): string {
    const array = new Uint32Array(4);
    crypto.getRandomValues(array);
    return Array.from(array, (n) => n.toString(16).padStart(8, '0')).join('');
  }

  parseUserAgent(userAgent: string): { browser?: string; os?: string } {
    let browser: string | undefined;
    let os: string | undefined;

    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Edg')) browser = 'Edge';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';

    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac OS')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

    return { browser, os };
  }
}
