import type { AnalyticsRepository } from '../types';

export function createSnapshotService(repository: AnalyticsRepository) {
  return {
    async createSnapshot(data: any) {
      try {
        return await repository.createSnapshot(data);
      } catch (error) {
        throw error;
      }
    },

    async restoreSnapshot(snapshotId: string) {
      try {
        return await repository.restoreSnapshot(snapshotId);
      } catch (error) {
        throw error;
      }
    },

    async listSnapshots(filters?: any) {
      try {
        return await repository.listSnapshots(filters);
      } catch (error) {
        throw error;
      }
    },

    async deleteSnapshot(snapshotId: string) {
      try {
        return await repository.deleteSnapshot(snapshotId);
      } catch (error) {
        throw error;
      }
    },
  };
}

export function createSnapshotsService(repository: any) { return createSnapshotService(repository); }
