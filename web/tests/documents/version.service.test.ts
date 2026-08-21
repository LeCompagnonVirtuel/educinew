import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createVersionService } from '../../src/features/documents/services/version.service';

const mockRepository = {
  getVersions: vi.fn(),
  getVersion: vi.fn(),
  createVersion: vi.fn(),
  restoreVersion: vi.fn(),
  compareVersions: vi.fn(),
  getVersionStats: vi.fn(),
  getDocument: vi.fn(),
};

describe('VersionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create VersionService with all methods', () => {
    const service = createVersionService(mockRepository as any);
    expect(typeof service.getVersions).toBe('function');
    expect(typeof service.getVersion).toBe('function');
    expect(typeof service.createVersion).toBe('function');
    expect(typeof service.restoreVersion).toBe('function');
    expect(typeof service.compareVersions).toBe('function');
    expect(typeof service.getVersionStats).toBe('function');
  });

  it('should fetch versions', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersions.mockResolvedValue([{ id: 'v1' }]);
    const result = await service.getVersions('doc1', 'user1');
    expect(result).toEqual([{ id: 'v1' }]);
  });

  it('should throw if documentId missing for getVersions', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.getVersions('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for getVersions', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.getVersions('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single version', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValue({ id: 'v1', versionNumber: 1 });
    const result = await service.getVersion('v1', 'user1');
    expect(result).toEqual({ id: 'v1', versionNumber: 1 });
  });

  it('should throw if version not found', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValue(null);
    await expect(service.getVersion('v1', 'user1')).rejects.toThrow();
  });

  it('should throw if versionId missing for getVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.getVersion('', 'user1')).rejects.toThrow('versionId is required');
  });

  it('should throw if userId missing for getVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.getVersion('v1', '')).rejects.toThrow('userId is required');
  });

  it('should create a version', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.createVersion.mockResolvedValue({ id: 'v1', documentId: 'doc1' });
    const result = await service.createVersion('doc1', 'school1', 'user1', { comment: 'Updated' });
    expect(result).toEqual({ id: 'v1', documentId: 'doc1' });
    expect(mockRepository.createVersion).toHaveBeenCalledWith('doc1', { comment: 'Updated', createdBy: 'user1' }, 'school1');
  });

  it('should throw if documentId missing for createVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.createVersion('', 'school1', 'user1', {})).rejects.toThrow('documentId is required');
  });

  it('should throw if schoolId missing for createVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.createVersion('doc1', '', 'user1', {})).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.createVersion('doc1', 'school1', '', {})).rejects.toThrow('userId is required');
  });

  it('should restore a version', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValue({ id: 'v1' });
    mockRepository.restoreVersion.mockResolvedValue({ id: 'doc1', versionId: 'v1' });
    const result = await service.restoreVersion('v1', 'user1');
    expect(result).toEqual({ id: 'doc1', versionId: 'v1' });
  });

  it('should throw if version not found for restoreVersion', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValue(null);
    await expect(service.restoreVersion('v1', 'user1')).rejects.toThrow();
  });

  it('should throw if versionId missing for restoreVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.restoreVersion('', 'user1')).rejects.toThrow('versionId is required');
  });

  it('should throw if userId missing for restoreVersion', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.restoreVersion('v1', '')).rejects.toThrow('userId is required');
  });

  it('should compare versions', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValueOnce({ id: 'v1' }).mockResolvedValueOnce({ id: 'v2' });
    mockRepository.compareVersions.mockResolvedValue({ changes: 'diff content' });
    const result = await service.compareVersions('v1', 'v2', 'user1');
    expect(result).toEqual({ changes: 'diff content' });
  });

  it('should throw if versionId1 missing for compareVersions', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.compareVersions('', 'v2', 'user1')).rejects.toThrow('versionId1 is required');
  });

  it('should throw if versionId2 missing for compareVersions', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.compareVersions('v1', '', 'user1')).rejects.toThrow('versionId2 is required');
  });

  it('should throw if userId missing for compareVersions', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.compareVersions('v1', 'v2', '')).rejects.toThrow('userId is required');
  });

  it('should throw if first version not found for compareVersions', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValueOnce(null);
    await expect(service.compareVersions('v1', 'v2', 'user1')).rejects.toThrow();
  });

  it('should throw if second version not found for compareVersions', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValueOnce({ id: 'v1' }).mockResolvedValueOnce(null);
    await expect(service.compareVersions('v1', 'v2', 'user1')).rejects.toThrow();
  });

  it('should fetch version stats', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersionStats.mockResolvedValue({ totalVersions: 10 });
    const result = await service.getVersionStats('school1', 'user1');
    expect(result).toEqual({ totalVersions: 10 });
  });

  it('should throw if schoolId missing for getVersionStats', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.getVersionStats('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getVersionStats', async () => {
    const service = createVersionService(mockRepository as any);
    await expect(service.getVersionStats('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getVersions', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersions.mockRejectedValue(new Error('DB error'));
    await expect(service.getVersions('doc1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createVersion', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.createVersion.mockRejectedValue(new Error('Create failed'));
    await expect(service.createVersion('doc1', 'school1', 'user1', {})).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for restoreVersion', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValue({ id: 'v1' });
    mockRepository.restoreVersion.mockRejectedValue(new Error('Restore failed'));
    await expect(service.restoreVersion('v1', 'user1')).rejects.toThrow('Restore failed');
  });

  it('should handle repository errors for compareVersions', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersion.mockResolvedValueOnce({ id: 'v1' }).mockResolvedValueOnce({ id: 'v2' });
    mockRepository.compareVersions.mockRejectedValue(new Error('Compare failed'));
    await expect(service.compareVersions('v1', 'v2', 'user1')).rejects.toThrow('Compare failed');
  });

  it('should handle repository errors for getVersionStats', async () => {
    const service = createVersionService(mockRepository as any);
    mockRepository.getVersionStats.mockRejectedValue(new Error('Stats failed'));
    await expect(service.getVersionStats('school1', 'user1')).rejects.toThrow('Stats failed');
  });
});
