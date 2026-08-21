import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRetentionService } from '../../src/features/documents/services/retention.service';

describe('RetentionService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getRetentionSchedules: vi.fn(),
      createRetentionSchedule: vi.fn(),
      updateRetentionSchedule: vi.fn(),
      deleteRetentionSchedule: vi.fn(),
      getDocumentsForDisposition: vi.fn(),
      disposeDocument: vi.fn(),
      getRetentionStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createRetentionService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getRetentionSchedules).toBeInstanceOf(Function);
    expect(service.createRetentionSchedule).toBeInstanceOf(Function);
    expect(service.updateRetentionSchedule).toBeInstanceOf(Function);
    expect(service.deleteRetentionSchedule).toBeInstanceOf(Function);
    expect(service.getDocumentsForDisposition).toBeInstanceOf(Function);
    expect(service.disposeDocument).toBeInstanceOf(Function);
    expect(service.getRetentionStats).toBeInstanceOf(Function);
  });

  describe('getRetentionSchedules', () => {
    it('should return retention schedules', async () => {
      const schedules = [{ id: 'rs-1', name: 'Standard Retention' }];
      mockRepository.getRetentionSchedules.mockResolvedValue(schedules);
      const service = createRetentionService(mockRepository);
      const result = await service.getRetentionSchedules('school-1', 'user-1');
      expect(result).toEqual(schedules);
      expect(mockRepository.getRetentionSchedules).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.getRetentionSchedules('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.getRetentionSchedules('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getRetentionSchedules.mockRejectedValue(new Error('DB error'));
      const service = createRetentionService(mockRepository);
      await expect(service.getRetentionSchedules('school-1', 'user-1')).rejects.toThrow('DB error');
    });
  });

  describe('createRetentionSchedule', () => {
    it('should create a retention schedule', async () => {
      const data = { name: 'Tax Records', retentionYears: 7 };
      const created = { id: 'rs-1', ...data, createdBy: 'user-1' };
      mockRepository.createRetentionSchedule.mockResolvedValue(created);
      const service = createRetentionService(mockRepository);
      const result = await service.createRetentionSchedule('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createRetentionSchedule).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Tax Records', retentionYears: 7, createdBy: 'user-1' }),
        'school-1'
      );
    });

    it('should throw if schoolId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.createRetentionSchedule('', 'user-1', { name: 'Test' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.createRetentionSchedule('school-1', '', { name: 'Test' })).rejects.toThrow('userId is required');
    });

    it('should throw if name missing from data', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.createRetentionSchedule('school-1', 'user-1', {})).rejects.toThrow('schedule name is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.createRetentionSchedule.mockRejectedValue(new Error('Create failed'));
      const service = createRetentionService(mockRepository);
      await expect(service.createRetentionSchedule('school-1', 'user-1', { name: 'Test' })).rejects.toThrow('Create failed');
    });
  });

  describe('updateRetentionSchedule', () => {
    it('should update a retention schedule', async () => {
      const updated = { id: 'rs-1', name: 'Updated' };
      mockRepository.getRetentionSchedules.mockResolvedValue([{ id: 'rs-1' }]);
      mockRepository.updateRetentionSchedule.mockResolvedValue(updated);
      const service = createRetentionService(mockRepository);
      const result = await service.updateRetentionSchedule('rs-1', 'user-1', { name: 'Updated' }, 'school-1');
      expect(result).toEqual(updated);
      expect(mockRepository.updateRetentionSchedule).toHaveBeenCalledWith('rs-1', { name: 'Updated' });
    });

    it('should throw if scheduleId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.updateRetentionSchedule('', 'user-1', { name: 'Test' }, 'school-1')).rejects.toThrow('scheduleId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.updateRetentionSchedule('rs-1', 'user-1', { name: 'Test' }, '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getRetentionSchedules.mockResolvedValue([{ id: 'rs-1' }]);
      mockRepository.updateRetentionSchedule.mockRejectedValue(new Error('Update failed'));
      const service = createRetentionService(mockRepository);
      await expect(service.updateRetentionSchedule('rs-1', 'user-1', { name: 'Test' }, 'school-1')).rejects.toThrow('Update failed');
    });
  });

  describe('deleteRetentionSchedule', () => {
    it('should delete a retention schedule', async () => {
      mockRepository.getRetentionSchedules.mockResolvedValue([{ id: 'rs-1', name: 'Test' }]);
      mockRepository.deleteRetentionSchedule.mockResolvedValue(undefined);
      const service = createRetentionService(mockRepository);
      await service.deleteRetentionSchedule('rs-1', 'user-1', 'school-1');
      expect(mockRepository.deleteRetentionSchedule).toHaveBeenCalledWith('rs-1');
    });

    it('should throw if scheduleId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.deleteRetentionSchedule('', 'user-1', 'school-1')).rejects.toThrow('scheduleId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.deleteRetentionSchedule('rs-1', 'user-1', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getRetentionSchedules.mockResolvedValue([{ id: 'rs-1' }]);
      mockRepository.deleteRetentionSchedule.mockRejectedValue(new Error('Delete failed'));
      const service = createRetentionService(mockRepository);
      await expect(service.deleteRetentionSchedule('rs-1', 'user-1', 'school-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('getDocumentsForDisposition', () => {
    it('should return documents for disposition', async () => {
      const documents = [{ id: 'doc-1', name: 'Expired Report' }];
      mockRepository.getDocumentsForDisposition.mockResolvedValue(documents);
      const service = createRetentionService(mockRepository);
      const result = await service.getDocumentsForDisposition('school-1', 'user-1');
      expect(result).toEqual(documents);
      expect(mockRepository.getDocumentsForDisposition).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.getDocumentsForDisposition('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.getDocumentsForDisposition('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentsForDisposition.mockRejectedValue(new Error('Query failed'));
      const service = createRetentionService(mockRepository);
      await expect(service.getDocumentsForDisposition('school-1', 'user-1')).rejects.toThrow('Query failed');
    });
  });

  describe('disposeDocument', () => {
    it('should dispose a document', async () => {
      const result = { id: 'doc-1', disposed: true };
      mockRepository.disposeDocument.mockResolvedValue(result);
      const service = createRetentionService(mockRepository);
      const response = await service.disposeDocument('doc-1', 'user-1');
      expect(response).toEqual(result);
      expect(mockRepository.disposeDocument).toHaveBeenCalledWith('doc-1', undefined);
    });

    it('should throw if documentId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.disposeDocument('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.disposeDocument('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.disposeDocument.mockRejectedValue(new Error('Dispose failed'));
      const service = createRetentionService(mockRepository);
      await expect(service.disposeDocument('doc-1', 'user-1')).rejects.toThrow('Dispose failed');
    });
  });

  describe('getRetentionStats', () => {
    it('should return retention stats', async () => {
      const stats = { total: 100, pending: 10, disposed: 90 };
      mockRepository.getRetentionStats.mockResolvedValue(stats);
      const service = createRetentionService(mockRepository);
      const result = await service.getRetentionStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getRetentionStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.getRetentionStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createRetentionService(mockRepository);
      await expect(service.getRetentionStats('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getRetentionStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createRetentionService(mockRepository);
      await expect(service.getRetentionStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
