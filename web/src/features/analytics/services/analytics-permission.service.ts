import type { AnalyticsRepository } from '../types';

export function createAnalyticsPermissionService(repository: AnalyticsRepository) {
  return {
    async checkAnalyticsPermission(userId: string, resource: string, action: string) {
      try {
        return await repository.checkAnalyticsPermission(userId, resource, action);
      } catch (error) {
        throw error;
      }
    },

    async getAnalyticsPermissions(userId: string) {
      try {
        return await repository.getAnalyticsPermissions(userId);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createAnalyticsPermissionsService(repository: any) { return createAnalyticsPermissionService(repository); }
