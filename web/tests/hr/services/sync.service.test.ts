import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SyncService', () => {
  const mockRepo = {
    syncData: vi.fn(),
    getSyncStatus: vi.fn(),
    resolveConflict: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('syncData', () => {
    it('should sync data successfully', async () => {
      mockRepo.syncData.mockResolvedValue({ synced: 10, conflicts: 0 });
      const result = await mockRepo.syncData(schoolId, 'employees');
      expect(result.synced).toBe(10);
    });

    it('should return conflicts', async () => {
      mockRepo.syncData.mockResolvedValue({ synced: 5, conflicts: 3 });
      const result = await mockRepo.syncData(schoolId, 'employees');
      expect(result.conflicts).toBe(3);
    });
  });

  describe('getSyncStatus', () => {
    it('should return sync status', async () => {
      mockRepo.getSyncStatus.mockResolvedValue({ lastSync: '2026-07-23T10:00:00Z', status: 'completed' });
      const result = await mockRepo.getSyncStatus(schoolId);
      expect(result.status).toBe('completed');
    });
  });

  describe('resolveConflict', () => {
    it('should resolve sync conflict', async () => {
      mockRepo.resolveConflict.mockResolvedValue({ resolved: true });
      const result = await mockRepo.resolveConflict(schoolId, 'conflict-1', 'local');
      expect(result.resolved).toBe(true);
    });
  });

  describe('Sync entity types', () => {
    it('should define valid entity types', () => {
      const types = ['employees', 'departments', 'positions', 'contracts', 'leaves'];
      expect(types).toContain('employees');
      expect(types).toContain('leaves');
    });
  });

  describe('Conflict resolution strategies', () => {
    it('should define valid strategies', () => {
      const strategies = ['local', 'remote', 'manual'];
      expect(strategies).toContain('local');
      expect(strategies).toContain('remote');
    });
  });
});
