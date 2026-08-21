import { AUTH } from '@educi/config';
import { logger } from '@educi/logger';

export class EmailVerificationService {
  private resendCounts = new Map<string, { count: number; firstAttempt: number }>();

  canResend(email: string): boolean {
    const record = this.resendCounts.get(email);
    if (!record) return true;

    const windowMs = AUTH.EMAIL_VERIFICATION.RESEND_WINDOW_MINUTES * 60 * 1000;
    if (Date.now() - record.firstAttempt > windowMs) {
      this.resendCounts.delete(email);
      return true;
    }

    return record.count < AUTH.EMAIL_VERIFICATION.MAX_RESENDS;
  }

  recordResend(email: string): void {
    const record = this.resendCounts.get(email);
    if (!record) {
      this.resendCounts.set(email, { count: 1, firstAttempt: Date.now() });
    } else {
      record.count++;
    }
  }

  getRemainingResends(email: string): number {
    const record = this.resendCounts.get(email);
    if (!record) return AUTH.EMAIL_VERIFICATION.MAX_RESENDS;
    return Math.max(0, AUTH.EMAIL_VERIFICATION.MAX_RESENDS - record.count);
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    if (!this.canResend(email)) {
      logger.warn('Email verification resend rate limited', { email }, 'email');
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://educi.live';
    const verificationUrl = `${siteUrl}/verification?token=${token}`;

    try {
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        this.recordResend(email);
        logger.info('Verification email sent', { email }, 'email');
      } else {
        logger.error('Failed to send verification email', { email }, 'email');
      }
    } catch (error) {
      logger.error('Email verification send error', { email, error: String(error) }, 'email');
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        logger.info('Password reset email sent', { email }, 'email');
      }
    } catch (error) {
      logger.error('Password reset email error', { email, error: String(error) }, 'email');
    }
  }
}
