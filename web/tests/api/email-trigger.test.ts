import { describe, it, expect } from 'vitest';
import { emailTrigger } from '@/lib/api/email-trigger.service';

describe('emailTrigger', () => {
  it('has onPasswordReset method', () => { expect(typeof emailTrigger.onPasswordReset).toBe('function'); });
  it('has onUserCreated method', () => { expect(typeof emailTrigger.onUserCreated).toBe('function'); });
  it('has onTeacherCreated method', () => { expect(typeof emailTrigger.onTeacherCreated).toBe('function'); });
  it('has onStudentCreated method', () => { expect(typeof emailTrigger.onStudentCreated).toBe('function'); });
  it('has onPaymentReceived method', () => { expect(typeof emailTrigger.onPaymentReceived).toBe('function'); });
  it('has onNewGrade method', () => { expect(typeof emailTrigger.onNewGrade).toBe('function'); });
  it('has onBulletinPublished method', () => { expect(typeof emailTrigger.onBulletinPublished).toBe('function'); });
  it('has onAbsence method', () => { expect(typeof emailTrigger.onAbsence).toBe('function'); });
  it('has onNewMessage method', () => { expect(typeof emailTrigger.onNewMessage).toBe('function'); });
  it('has onTrialEnding method', () => { expect(typeof emailTrigger.onTrialEnding).toBe('function'); });
});
