import type { AuthRepository, AuthSession } from '../types';
import { SessionExpiredError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AUTH } from '@educi/config';

export class SessionService {
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly authRepo: AuthRepository) {}

  async getCurrent(): Promise<AuthSession | null> {
    return this.authRepo.getSession();
  }

  async refresh(): Promise<AuthSession> {
    try {
      const session = await this.authRepo.refreshSession();
      this.scheduleProactiveRefresh(session);
      return session;
    } catch {
      logger.error('Session refresh failed', {}, 'session');
      throw new SessionExpiredError();
    }
  }

  scheduleProactiveRefresh(session: AuthSession): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = session.expiresAt - now;
    const refreshIn = Math.max(
      (expiresIn - AUTH.SESSION.PROACTIVE_REFRESH_MINUTES * 60) * 1000,
      30_000,
    );

    this.refreshTimer = setTimeout(async () => {
      try {
        await this.refresh();
      } catch {
        logger.warn('Proactive refresh failed', {}, 'session');
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
}
