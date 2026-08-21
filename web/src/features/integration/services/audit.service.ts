import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgAuditError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createAuditService(repository: EnterpriseIntegrationRepository) {
  return {
    async listAuditLogs(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing audit logs', { schoolId, userId }, 'AuditService');
        const result = await repository.listAuditLogs(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list audit logs', { schoolId, error }, 'AuditService');
        throw error;
      }
    },

    async getAuditLog(schoolId: string, userId: string, auditLogId: string) {
      try {
        logger.info('Getting audit log', { schoolId, userId, auditLogId }, 'AuditService');
        const result = await repository.getAuditLog(schoolId, auditLogId);
        return result;
      } catch (error) {
        logger.error('Failed to get audit log', { schoolId, auditLogId, error }, 'AuditService');
        throw error;
      }
    },

    async exportAuditLogs(schoolId: string, userId: string, filters: Record<string, unknown>, format: string) {
      try {
        logger.info('Exporting audit logs', { schoolId, userId, format }, 'AuditService');
        const result = await repository.exportAuditLogs(schoolId, filters, format);
        return result;
      } catch (error) {
        logger.error('Failed to export audit logs', { schoolId, format, error }, 'AuditService');
        throw error;
      }
    },

    async searchAuditLogs(schoolId: string, userId: string, query: string) {
      try {
        logger.info('Searching audit logs', { schoolId, userId, query }, 'AuditService');
        const result = await repository.searchAuditLogs(schoolId, query);
        return result;
      } catch (error) {
        logger.error('Failed to search audit logs', { schoolId, query, error }, 'AuditService');
        throw error;
      }
    },

    async getAuditLogStats(schoolId: string, userId: string, timeRange: Record<string, unknown>) {
      try {
        logger.info('Getting audit log stats', { schoolId, userId }, 'AuditService');
        const result = await repository.getAuditLogStats(schoolId, timeRange);
        return result;
      } catch (error) {
        logger.error('Failed to get audit log stats', { schoolId, error }, 'AuditService');
        throw error;
      }
    },

    async getAuditLogsByUser(schoolId: string, userId: string, targetUserId: string) {
      try {
        logger.info('Getting audit logs by user', { schoolId, userId, targetUserId }, 'AuditService');
        const result = await repository.getAuditLogsByUser(schoolId, targetUserId);
        return result;
      } catch (error) {
        logger.error('Failed to get audit logs by user', { schoolId, targetUserId, error }, 'AuditService');
        throw error;
      }
    },

    async getAuditLogsByResource(schoolId: string, userId: string, resourceType: string, resourceId: string) {
      try {
        logger.info('Getting audit logs by resource', { schoolId, userId, resourceType, resourceId }, 'AuditService');
        const result = await repository.getAuditLogsByResource(schoolId, resourceType, resourceId);
        return result;
      } catch (error) {
        logger.error('Failed to get audit logs by resource', { schoolId, resourceType, resourceId, error }, 'AuditService');
        throw error;
      }
    },
  };
}