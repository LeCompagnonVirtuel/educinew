import { describe, it, expect } from 'vitest';
import { AuditOnboardingService } from '@/features/onboarding/services/audit-onboarding.service';

describe('AuditOnboardingService', () => {
  const service = new AuditOnboardingService();

  it('should log onboarding events without error', async () => {
    await expect(
      service.log({
        action: 'ONBOARDING_CREATE',
        onboardingId: 'test-123',
        userId: 'user-456',
        details: { step: 'general_info' },
      })
    ).resolves.toBeUndefined();
  });

  it('should log wizard step changes', async () => {
    await expect(
      service.log({
        action: 'WIZARD_STEP_CHANGE',
        onboardingId: 'test-123',
        details: { step: 'admin_info' },
      })
    ).resolves.toBeUndefined();
  });

  it('should log completion events', async () => {
    await expect(
      service.log({
        action: 'ONBOARDING_COMPLETE',
        onboardingId: 'test-123',
        userId: 'user-456',
        schoolId: 'school-789',
        details: { schoolName: 'École Test' },
      })
    ).resolves.toBeUndefined();
  });
});
