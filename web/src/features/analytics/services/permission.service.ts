import type { AnalyticsRepository } from '../types';

export function createPermissionService(repository: AnalyticsRepository) {
  return {
    async checkPermission(userId: string, resource: string, action: string) {
      try {
        return await repository.checkPermission(userId, resource, action);
      } catch (error) {
        throw error;
      }
    },

    async getPermissions(userId: string) {
      try {
        return await repository.getPermissions(userId);
      } catch (error) {
        throw error;
      }
    },

    async grantPermission(userId: string, resource: string, action: string) {
      try {
        return await repository.grantPermission(userId, resource, action);
      } catch (error) {
        throw error;
      }
    },

    async revokePermission(userId: string, resource: string, action: string) {
      try {
        return await repository.revokePermission(userId, resource, action);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createPermissionsService(repository: any) { return createPermissionService(repository); }
