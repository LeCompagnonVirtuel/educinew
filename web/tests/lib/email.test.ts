import { describe, it, expect } from 'vitest';
import { emailApi } from '@/lib/api/email';

describe('emailApi', () => {
  it('has send method', () => { expect(typeof emailApi.send).toBe('function'); });
  it('has sendWelcome method', () => { expect(typeof emailApi.sendWelcome).toBe('function'); });
  it('has sendPasswordReset method', () => { expect(typeof emailApi.sendPasswordReset).toBe('function'); });
  it('has sendPaymentReceived method', () => { expect(typeof emailApi.sendPaymentReceived).toBe('function'); });
  it('has sendBulletinAvailable method', () => { expect(typeof emailApi.sendBulletinAvailable).toBe('function'); });
  it('has sendBulk method', () => { expect(typeof emailApi.sendBulk).toBe('function'); });
  it('has getLogs method', () => { expect(typeof emailApi.getLogs).toBe('function'); });
  it('has getStats method', () => { expect(typeof emailApi.getStats).toBe('function'); });
});
