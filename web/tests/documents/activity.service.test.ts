import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createActivityService } from '../../src/features/documents/services/activity.service';

const mockRepository = {
  getActivities: vi.fn(),
  logActivity: vi.fn(),
  getDocumentActivities: vi.fn(),
  getUserActivities: vi.fn(),
  getDocumentActivityStats: vi.fn(),
  getAuditTrail: vi.fn(),
};

describe('ActivityService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create ActivityService with all methods', () => {
    const service = createActivityService(mockRepository as any);
    expect(typeof service.getActivities).toBe('function');
    expect(typeof service.logActivity).toBe('function');
    expect(typeof service.getActivitiesByDocument).toBe('function');
    expect(typeof service.getActivitiesByUser).toBe('function');
    expect(typeof service.getActivitiesByDate).toBe('function');
    expect(typeof service.getActivityStats).toBe('function');
  });

  it('should fetch activities', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getActivities.mockResolvedValue([{ id: 'a1', action: 'view' }]);
    const result = await service.getActivities('school1', 'user1');
    expect(result).toEqual([{ id: 'a1', action: 'view' }]);
  });

  it('should fetch activities with filters', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getActivities.mockResolvedValue([{ id: 'a1' }]);
    const filters = { action: 'view' };
    await service.getActivities('school1', 'user1', filters);
    expect(mockRepository.getActivities).toHaveBeenCalledWith('school1', filters);
  });

  it('should throw if schoolId missing for getActivities', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivities('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getActivities', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivities('school1', '')).rejects.toThrow('userId is required');
  });

  it('should log an activity', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.logActivity.mockResolvedValue({ id: 'a1', action: 'create' });
    const result = await service.logActivity('school1', 'user1', { action: 'create', documentId: 'doc1' });
    expect(result).toEqual({ id: 'a1', action: 'create' });
  });

  it('should throw if schoolId missing for logActivity', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.logActivity('', 'user1', { action: 'view' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for logActivity', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.logActivity('school1', '', { action: 'view' })).rejects.toThrow('userId is required');
  });

  it('should throw if action missing for logActivity', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.logActivity('school1', 'user1', {})).rejects.toThrow('activity action is required');
  });

  it('should throw if data null for logActivity', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.logActivity('school1', 'user1', null as any)).rejects.toThrow('activity action is required');
  });

  it('should fetch activities by document', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getDocumentActivities.mockResolvedValue([{ id: 'a1', documentId: 'doc1' }]);
    const result = await service.getActivitiesByDocument('doc1', 'user1');
    expect(result).toEqual([{ id: 'a1', documentId: 'doc1' }]);
  });

  it('should throw if documentId missing for getActivitiesByDocument', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByDocument('', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if userId missing for getActivitiesByDocument', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByDocument('doc1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch activities by user', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getUserActivities.mockResolvedValue([{ id: 'a1', userId: 'u2' }]);
    const result = await service.getActivitiesByUser('school1', 'user1', 'u2');
    expect(result).toEqual([{ id: 'a1', userId: 'u2' }]);
  });

  it('should throw if schoolId missing for getActivitiesByUser', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByUser('', 'user1', 'u2')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getActivitiesByUser', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByUser('school1', '', 'u2')).rejects.toThrow('userId is required');
  });

  it('should throw if targetUserId missing for getActivitiesByUser', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByUser('school1', 'user1', '')).rejects.toThrow('targetUserId is required');
  });

  it('should fetch activities by date', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getActivities.mockResolvedValue([
      { id: 'a1', createdAt: '2024-01-15T10:00:00Z' },
      { id: 'a2', createdAt: '2024-02-15T10:00:00Z' },
    ]);
    const result = await service.getActivitiesByDate('school1', 'user1', '2024-01-01', '2024-01-31');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('a1');
  });

  it('should throw if schoolId missing for getActivitiesByDate', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByDate('', 'user1', '2024-01-01', '2024-01-31')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getActivitiesByDate', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByDate('school1', '', '2024-01-01', '2024-01-31')).rejects.toThrow('userId is required');
  });

  it('should throw if dateFrom missing for getActivitiesByDate', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByDate('school1', 'user1', '', '2024-01-31')).rejects.toThrow('dateFrom is required');
  });

  it('should throw if dateTo missing for getActivitiesByDate', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivitiesByDate('school1', 'user1', '2024-01-01', '')).rejects.toThrow('dateTo is required');
  });

  it('should fetch activity stats', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getDocumentActivityStats.mockResolvedValue({ totalActivities: 100 });
    const result = await service.getActivityStats('school1', 'user1');
    expect(result).toEqual({ totalActivities: 100 });
  });

  it('should throw if schoolId missing for getActivityStats', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivityStats('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getActivityStats', async () => {
    const service = createActivityService(mockRepository as any);
    await expect(service.getActivityStats('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getActivities', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getActivities.mockRejectedValue(new Error('DB error'));
    await expect(service.getActivities('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for logActivity', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.logActivity.mockRejectedValue(new Error('Log failed'));
    await expect(service.logActivity('school1', 'user1', { action: 'view' })).rejects.toThrow('Log failed');
  });

  it('should handle repository errors for getActivitiesByDocument', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getDocumentActivities.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getActivitiesByDocument('doc1', 'user1')).rejects.toThrow('Fetch failed');
  });

  it('should handle repository errors for getActivitiesByUser', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getUserActivities.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getActivitiesByUser('school1', 'user1', 'u2')).rejects.toThrow('Fetch failed');
  });

  it('should handle repository errors for getActivityStats', async () => {
    const service = createActivityService(mockRepository as any);
    mockRepository.getDocumentActivityStats.mockRejectedValue(new Error('Stats failed'));
    await expect(service.getActivityStats('school1', 'user1')).rejects.toThrow('Stats failed');
  });
});
