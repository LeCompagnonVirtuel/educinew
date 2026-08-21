import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createNotificationService } from '../../src/features/communication/services/notification.service';

const mockRepository = {
  getNotifications: vi.fn(),
  getNotification: vi.fn(),
  updateNotification: vi.fn(),
  getNotificationPreferences: vi.fn(),
  updateNotificationPreference: vi.fn(),
  sendNotificationBatch: vi.fn(),
  getNotificationStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('NotificationService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create NotificationService with all methods', () => {
    const service = createNotificationService(mockRepository as any);
    expect(typeof service.getNotifications).toBe('function');
    expect(typeof service.markNotificationRead).toBe('function');
    expect(typeof service.getNotificationPreferences).toBe('function');
    expect(typeof service.updateNotificationPreference).toBe('function');
    expect(typeof service.sendNotificationBatch).toBe('function');
    expect(typeof service.getNotificationStats).toBe('function');
  });

  it('should fetch notifications', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotifications.mockResolvedValue([{ id: 'n1' }]);
    const result = await service.getNotifications('school1', 'user1');
    expect(result).toEqual([{ id: 'n1' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.getNotifications('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should mark notification as read', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotification.mockResolvedValue({ id: 'n1', schoolId: 'school1' });
    mockRepository.updateNotification.mockResolvedValue({ id: 'n1', read: true });
    const result = await service.markNotificationRead('n1', 'user1');
    expect(result.read).toBe(true);
  });

  it('should throw if notification not found', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotification.mockResolvedValue(null);
    await expect(service.markNotificationRead('n1', 'user1')).rejects.toThrow();
  });

  it('should get notification preferences', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    const result = await service.getNotificationPreferences('school1', 'user1');
    expect(result.email).toBe(true);
  });

  it('should update notification preference', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.updateNotificationPreference.mockResolvedValue({ email: false });
    const result = await service.updateNotificationPreference('school1', 'user1', { email: false });
    expect(result.email).toBe(false);
  });

  it('should throw if data missing for updateNotificationPreference', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.updateNotificationPreference('school1', 'user1', undefined)).rejects.toThrow('preference data is required');
  });

  it('should send notification batch', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.sendNotificationBatch.mockResolvedValue({ id: 'b1', status: 'sending' });
    const result = await service.sendNotificationBatch('school1', 'user1', { title: 'Alert', recipients: ['u1'] });
    expect(result.status).toBe('sending');
  });

  it('should throw if title missing for sendNotificationBatch', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.sendNotificationBatch('school1', 'user1', { recipients: ['u1'] })).rejects.toThrow('notification title is required');
  });

  it('should throw if recipients empty for sendNotificationBatch', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.sendNotificationBatch('school1', 'user1', { title: 'T', recipients: [] })).rejects.toThrow('recipients are required');
  });

  it('should get notification stats', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotificationStats.mockResolvedValue({ total: 50 });
    const result = await service.getNotificationStats('school1');
    expect(result).toEqual({ total: 50 });
  });

  it('should throw if schoolId missing for getNotificationStats', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.getNotificationStats('')).rejects.toThrow('schoolId is required');
  });

  it('should throw if notificationId missing for markNotificationRead', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.markNotificationRead('', 'user1')).rejects.toThrow('notificationId is required');
  });

  it('should throw if userId missing for markNotificationRead', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.markNotificationRead('n1', '')).rejects.toThrow('userId is required');
  });

  it('should handle getNotifications with filters', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotifications.mockResolvedValue([]);
    await service.getNotifications('school1', 'user1', { unread: true });
    expect(mockRepository.getNotifications).toHaveBeenCalledWith('school1', 'user1', { unread: true });
  });

  it('should handle getNotificationStats with date range', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotificationStats.mockResolvedValue({ total: 10 });
    await service.getNotificationStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getNotificationStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on markNotificationRead', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.getNotification.mockResolvedValue({ id: 'n1', schoolId: 'school1' });
    mockRepository.updateNotification.mockResolvedValue({ id: 'n1' });
    await service.markNotificationRead('n1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'notification.read', expect.any(Object));
  });

  it('should log event on updateNotificationPreference', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.updateNotificationPreference.mockResolvedValue({ id: 'p1' });
    await service.updateNotificationPreference('school1', 'user1', { email: false });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'notification.preference_updated', expect.any(Object));
  });

  it('should log event on sendNotificationBatch', async () => {
    const service = createNotificationService(mockRepository as any);
    mockRepository.sendNotificationBatch.mockResolvedValue({ id: 'b1' });
    await service.sendNotificationBatch('school1', 'user1', { title: 'T', recipients: ['u1'] });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'notification.batch_sent', expect.any(Object));
  });

  it('should throw if userId missing for sendNotificationBatch', async () => {
    const service = createNotificationService(mockRepository as any);
    await expect(service.sendNotificationBatch('school1', '', { title: 'T', recipients: ['u1'] })).rejects.toThrow('userId is required');
  });
});
