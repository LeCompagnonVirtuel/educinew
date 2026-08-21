import type { AuthSession } from '@educi/types';
import { logger } from '@educi/logger';

export class MobileSessionService {
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private refreshCallback: (() => Promise<AuthSession>) | null = null;

  setRefreshCallback(callback: () => Promise<AuthSession>): void {
    this.refreshCallback = callback;
  }

  scheduleProactiveRefresh(session: AuthSession): void {
    this.clearRefreshTimer();

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = session.expiresAt - now;
    const refreshIn = Math.max((expiresIn - 5 * 60) * 1000, 30_000);

    this.refreshTimer = setTimeout(async () => {
      if (!this.refreshCallback) return;
      try {
        const newSession = await this.refreshCallback();
        this.scheduleProactiveRefresh(newSession);
      } catch {
        logger.warn('Mobile proactive refresh failed', {}, 'mobile-session');
      }
    }, refreshIn);
  }

  clearRefreshTimer(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  isExpired(session: AuthSession): boolean {
    const now = Math.floor(Date.now() / 1000);
    return session.expiresAt < now;
  }

  getTimeUntilExpiry(session: AuthSession): number {
    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, session.expiresAt - now);
  }

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
}
