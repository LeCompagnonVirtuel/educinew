import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRestoreService } from '../../src/features/documents/services/restore.service';

const mockRepository = {
  getRestoreHistory: vi.fn(),
  createRestoreRequest: vi.fn(),
  approveRestore: vi.fn(),
  completeRestore: vi.fn(),
  rejectRestore: vi.fn(),
};

describe('RestoreService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create RestoreService with all methods', () => {
    const service = createRestoreService(mockRepository as any);
    expect(typeof service.getRestoreHistory).toBe('function');
    expect(typeof service.createRestore).toBe('function');
    expect(typeof service.getRestores).toBe('function');
    expect(typeof service.getRestore).toBe('function');
    expect(typeof service.cancelRestore).toBe('function');
    expect(typeof service.getRestoreStats).toBe('function');
  });

  it('should fetch restore history', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockResolvedValue([{ id: 'r1', status: 'completed' }]);
    const result = await service.getRestoreHistory('school1', 'user1');
    expect(result).toEqual([{ id: 'r1', status: 'completed' }]);
  });

  it('should throw if schoolId missing for getRestoreHistory', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestoreHistory('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getRestoreHistory', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestoreHistory('school1', '')).rejects.toThrow('userId is required');
  });

  it('should create a restore request', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.createRestoreRequest.mockResolvedValue({ id: 'r1', status: 'pending' });
    const result = await service.createRestore('school1', 'user1', 'doc1');
    expect(result).toEqual({ id: 'r1', status: 'pending' });
  });

  it('should create a restore request with versionId', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.createRestoreRequest.mockResolvedValue({ id: 'r1', status: 'pending' });
    await service.createRestore('school1', 'user1', 'doc1', 'v1');
    expect(mockRepository.createRestoreRequest).toHaveBeenCalledWith('doc1', 'school1', 'v1');
  });

  it('should throw if schoolId missing for createRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.createRestore('', 'user1', 'doc1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.createRestore('school1', '', 'doc1')).rejects.toThrow('userId is required');
  });

  it('should throw if documentId missing for createRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.createRestore('school1', 'user1', '')).rejects.toThrow('documentId is required');
  });

  it('should cancel a restore', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockResolvedValue([{ id: 'r1', status: 'pending' }]);
    const result = await service.cancelRestore('r1', 'user1');
    expect(result).toBeDefined();
  });

  it('should throw if restoreId missing for cancelRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.cancelRestore('', 'user1')).rejects.toThrow('restoreId is required');
  });

  it('should throw if userId missing for cancelRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.cancelRestore('r1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch restores', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockResolvedValue([{ id: 'r1' }]);
    const result = await service.getRestores('school1', 'user1');
    expect(result).toEqual([{ id: 'r1' }]);
  });

  it('should throw if schoolId missing for getRestores', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestores('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getRestores', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestores('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single restore', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockResolvedValue([{ id: 'r1', status: 'completed' }]);
    const result = await service.getRestore('r1', 'user1');
    expect(result).toEqual({ id: 'r1', status: 'completed' });
  });

  it('should throw if restore not found for getRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockResolvedValue([]);
    await expect(service.getRestore('r1', 'user1')).rejects.toThrow();
  });

  it('should throw if restoreId missing for getRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestore('', 'user1')).rejects.toThrow('restoreId is required');
  });

  it('should throw if userId missing for getRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestore('r1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch restore stats', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockResolvedValue([
      { id: 'r1', status: 'completed' },
      { id: 'r2', status: 'pending' },
      { id: 'r3', status: 'failed' },
    ]);
    const result = await service.getRestoreStats('school1', 'user1');
    expect(result).toEqual({ totalRestores: 3, completedRestores: 1, pendingRestores: 1, failedRestores: 1 });
  });

  it('should throw if schoolId missing for getRestoreStats', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestoreStats('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getRestoreStats', async () => {
    const service = createRestoreService(mockRepository as any);
    await expect(service.getRestoreStats('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getRestoreHistory', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockRejectedValue(new Error('DB error'));
    await expect(service.getRestoreHistory('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.createRestoreRequest.mockRejectedValue(new Error('Create failed'));
    await expect(service.createRestore('school1', 'user1', 'doc1')).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for cancelRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockRejectedValue(new Error('Cancel failed'));
    await expect(service.cancelRestore('r1', 'user1')).rejects.toThrow('Cancel failed');
  });

  it('should handle repository errors for getRestores', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getRestores('school1', 'user1')).rejects.toThrow('Fetch failed');
  });

  it('should handle repository errors for getRestore', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getRestore('r1', 'user1')).rejects.toThrow('Fetch failed');
  });

  it('should handle repository errors for getRestoreStats', async () => {
    const service = createRestoreService(mockRepository as any);
    mockRepository.getRestoreHistory.mockRejectedValue(new Error('Stats failed'));
    await expect(service.getRestoreStats('school1', 'user1')).rejects.toThrow('Stats failed');
  });
});
