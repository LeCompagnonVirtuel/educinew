import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBackupService } from '../../src/features/documents/services/backup.service';

const mockRepository = {
  getBackupJobs: vi.fn(),
  getBackupJob: vi.fn(),
  createBackupJob: vi.fn(),
  cancelBackupJob: vi.fn(),
  deleteBackupJob: vi.fn(),
  getBackupHistory: vi.fn(),
  downloadBackup: vi.fn(),
};

describe('BackupService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create BackupService with all methods', () => {
    const service = createBackupService(mockRepository as any);
    expect(typeof service.getBackups).toBe('function');
    expect(typeof service.getBackup).toBe('function');
    expect(typeof service.createBackup).toBe('function');
    expect(typeof service.deleteBackup).toBe('function');
    expect(typeof service.restoreBackup).toBe('function');
    expect(typeof service.getBackupJobs).toBe('function');
    expect(typeof service.getBackupStats).toBe('function');
  });

  it('should fetch backup jobs', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJobs.mockResolvedValue([{ id: 'b1', status: 'completed' }]);
    const result = await service.getBackupJobs('school1', 'user1');
    expect(result).toEqual([{ id: 'b1', status: 'completed' }]);
  });

  it('should throw if schoolId missing for getBackupJobs', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackupJobs('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getBackupJobs', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackupJobs('school1', '')).rejects.toThrow('userId is required');
  });

  it('should create a backup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.createBackupJob.mockResolvedValue({ id: 'b1', status: 'in_progress' });
    const result = await service.createBackup('school1', 'user1');
    expect(result).toEqual({ id: 'b1', status: 'in_progress' });
  });

  it('should create a backup with options', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.createBackupJob.mockResolvedValue({ id: 'b1' });
    await service.createBackup('school1', 'user1', { type: 'full', documentIds: ['doc1'] });
    expect(mockRepository.createBackupJob).toHaveBeenCalledWith('school1', { type: 'full', documentIds: ['doc1'] });
  });

  it('should throw if schoolId missing for createBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.createBackup('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.createBackup('school1', '')).rejects.toThrow('userId is required');
  });

  it('should delete a backup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue({ id: 'b1' });
    mockRepository.deleteBackupJob.mockResolvedValue(undefined);
    await service.deleteBackup('b1', 'user1');
    expect(mockRepository.deleteBackupJob).toHaveBeenCalledWith('b1');
  });

  it('should throw if backup not found for deleteBackup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue(null);
    await expect(service.deleteBackup('b1', 'user1')).rejects.toThrow();
  });

  it('should throw if backupId missing for deleteBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.deleteBackup('', 'user1')).rejects.toThrow('backupId is required');
  });

  it('should throw if userId missing for deleteBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.deleteBackup('b1', '')).rejects.toThrow('userId is required');
  });

  it('should restore a backup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue({ id: 'b1' });
    mockRepository.downloadBackup.mockResolvedValue({ id: 'b1', expiresAt: '2024-12-31' });
    const result = await service.restoreBackup('b1', 'user1');
    expect(result).toEqual({ id: 'b1', expiresAt: '2024-12-31' });
  });

  it('should throw if backup not found for restoreBackup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue(null);
    await expect(service.restoreBackup('b1', 'user1')).rejects.toThrow();
  });

  it('should throw if backupId missing for restoreBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.restoreBackup('', 'user1')).rejects.toThrow('backupId is required');
  });

  it('should throw if userId missing for restoreBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.restoreBackup('b1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch backups', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJobs.mockResolvedValue([{ id: 'b1' }]);
    const result = await service.getBackups('school1', 'user1');
    expect(result).toEqual([{ id: 'b1' }]);
  });

  it('should throw if schoolId missing for getBackups', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackups('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getBackups', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackups('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single backup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue({ id: 'b1', status: 'completed' });
    const result = await service.getBackup('b1', 'user1');
    expect(result).toEqual({ id: 'b1', status: 'completed' });
  });

  it('should throw if backup not found for getBackup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue(null);
    await expect(service.getBackup('b1', 'user1')).rejects.toThrow();
  });

  it('should throw if backupId missing for getBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackup('', 'user1')).rejects.toThrow('backupId is required');
  });

  it('should throw if userId missing for getBackup', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackup('b1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch backup stats', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJobs.mockResolvedValue([
      { id: 'b1', status: 'completed' },
      { id: 'b2', status: 'failed' },
      { id: 'b3', status: 'in_progress' },
    ]);
    const result = await service.getBackupStats('school1', 'user1');
    expect(result).toEqual({ totalBackups: 3, completedBackups: 1, failedBackups: 1, activeBackups: 1 });
  });

  it('should throw if schoolId missing for getBackupStats', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackupStats('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getBackupStats', async () => {
    const service = createBackupService(mockRepository as any);
    await expect(service.getBackupStats('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getBackupJobs', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJobs.mockRejectedValue(new Error('DB error'));
    await expect(service.getBackupJobs('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createBackup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.createBackupJob.mockRejectedValue(new Error('Create failed'));
    await expect(service.createBackup('school1', 'user1')).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for deleteBackup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue({ id: 'b1' });
    mockRepository.deleteBackupJob.mockRejectedValue(new Error('Delete failed'));
    await expect(service.deleteBackup('b1', 'user1')).rejects.toThrow('Delete failed');
  });

  it('should handle repository errors for restoreBackup', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJob.mockResolvedValue({ id: 'b1' });
    mockRepository.downloadBackup.mockRejectedValue(new Error('Restore failed'));
    await expect(service.restoreBackup('b1', 'user1')).rejects.toThrow('Restore failed');
  });

  it('should handle repository errors for getBackupStats', async () => {
    const service = createBackupService(mockRepository as any);
    mockRepository.getBackupJobs.mockRejectedValue(new Error('Stats failed'));
    await expect(service.getBackupStats('school1', 'user1')).rejects.toThrow('Stats failed');
  });
});
