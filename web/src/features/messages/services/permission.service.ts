import { logger } from '@educi/logger';

export class PermissionService {
  private readonly schoolId: string;
  constructor(deps: { repository: any; schoolId: string }) { this.schoolId = deps.schoolId; }

  async canSendMessage(userId: string, userRole: string, conversationId: string) {
    logger.info('Checking send message permission', { userId, userRole, conversationId });
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'DIRECTOR', 'SECRETARY', 'ACCOUNTANT', 'STAFF', 'STUDENT', 'PARENT'];
    return { allowed: allowed.includes(userRole), reason: allowed.includes(userRole) ? 'Authorized' : 'Insufficient permissions' };
  }

  async canCreateConversation(userId: string, userRole: string) {
    logger.info('Checking create conversation permission', { userId, userRole });
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'DIRECTOR', 'SECRETARY', 'ACCOUNTANT', 'STAFF', 'STUDENT', 'PARENT'];
    return { allowed: allowed.includes(userRole) };
  }

  async canCreateGroup(userId: string, userRole: string) {
    logger.info('Checking create group permission', { userId, userRole });
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'DIRECTOR'];
    return { allowed: allowed.includes(userRole) };
  }

  async canCreateAnnouncement(userId: string, userRole: string) {
    logger.info('Checking create announcement permission', { userId, userRole });
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'DIRECTOR', 'ACADEMIC_DIRECTOR'];
    return { allowed: allowed.includes(userRole) };
  }

  async canCreateBroadcast(userId: string, userRole: string) {
    logger.info('Checking create broadcast permission', { userId, userRole });
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'DIRECTOR'];
    return { allowed: allowed.includes(userRole) };
  }

  async canModerate(userId: string, userRole: string) {
    logger.info('Checking moderate permission', { userId, userRole });
    const allowed = ['ADMIN', 'SUPER_ADMIN', 'DIRECTOR'];
    return { allowed: allowed.includes(userRole) };
  }

  async canDeleteMessage(userId: string, userRole: string, messageOwnerId: string) {
    logger.info('Checking delete message permission', { userId, userRole });
    if (['ADMIN', 'SUPER_ADMIN'].includes(userRole)) return { allowed: true };
    return { allowed: userId === messageOwnerId, reason: userId === messageOwnerId ? 'Owner' : 'Insufficient permissions' };
  }

  async canEditMessage(userId: string, userRole: string, messageOwnerId: string) {
    logger.info('Checking edit message permission', { userId, userRole });
    if (['ADMIN', 'SUPER_ADMIN'].includes(userRole)) return { allowed: true };
    return { allowed: userId === messageOwnerId };
  }
}
