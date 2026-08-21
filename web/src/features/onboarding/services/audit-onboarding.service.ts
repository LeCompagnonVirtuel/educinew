import { logger } from '@educi/logger';

export interface AuditOnboardingEvent {
  action: string;
  onboardingId?: string;
  userId?: string;
  schoolId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditOnboardingService {
  async log(event: AuditOnboardingEvent): Promise<void> {
    logger.info('Onboarding audit event', {
      action: event.action,
      onboardingId: event.onboardingId,
      userId: event.userId,
      schoolId: event.schoolId,
      details: event.details,
    }, 'onboarding');
  }
}
