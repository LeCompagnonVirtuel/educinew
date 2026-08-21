import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPushService } from '../../src/features/communication/services/push.service';

const mockRepository = {
  getPushNotifications: vi.fn(),
  sendPushNotification: vi.fn(),
  subscribeToPush: vi.fn(),
  unsubscribeFromPush: vi.fn(),
  getPushTemplates: vi.fn(),
  deletePushTemplate: vi.fn(),
  getPushStats: vi.fn(),
  sendBulkPush: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('PushService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create PushService with all methods', () => {
    const service = createPushService(mockRepository as any);
    expect(typeof service.getPushNotifications).toBe('function');
    expect(typeof service.sendPushNotification).toBe('function');
    expect(typeof service.subscribeToPush).toBe('function');
    expect(typeof service.unsubscribeFromPush).toBe('function');
    expect(typeof service.getPushTemplates).toBe('function');
    expect(typeof service.deletePushTemplate).toBe('function');
    expect(typeof service.getPushStats).toBe('function');
    expect(typeof service.sendBulkPush).toBe('function');
  });

  it('should fetch push notifications', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.getPushNotifications.mockResolvedValue([{ id: 'p1' }]);
    const result = await service.getPushNotifications('school1', 'user1');
    expect(result).toEqual([{ id: 'p1' }]);
  });

  it('should throw if schoolId missing for getPushNotifications', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.getPushNotifications('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should send push notification', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.sendPushNotification.mockResolvedValue({ id: 'p1', status: 'sent' });
    const result = await service.sendPushNotification('school1', 'user1', { title: 'Alert', body: 'New message' });
    expect(result.status).toBe('sent');
  });

  it('should throw if title missing for sendPushNotification', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendPushNotification('school1', 'user1', { body: 'Hi' })).rejects.toThrow('notification title is required');
  });

  it('should throw if body missing for sendPushNotification', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendPushNotification('school1', 'user1', { title: 'Hi' })).rejects.toThrow('notification body is required');
  });

  it('should subscribe to push', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.subscribeToPush.mockResolvedValue({ id: 'sub1' });
    const result = await service.subscribeToPush('school1', 'user1', { endpoint: 'https://push.example', keys: { p256dh: 'key', auth: 'auth' } });
    expect(result).toEqual({ id: 'sub1' });
  });

  it('should throw if endpoint missing for subscribeToPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.subscribeToPush('school1', 'user1', { keys: {} })).rejects.toThrow('push endpoint is required');
  });

  it('should throw if keys missing for subscribeToPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.subscribeToPush('school1', 'user1', { endpoint: 'https://push.example' })).rejects.toThrow('push keys are required');
  });

  it('should unsubscribe from push', async () => {
    const service = createPushService(mockRepository as any);
    await service.unsubscribeFromPush('school1', 'user1', 'sub1');
    expect(mockRepository.unsubscribeFromPush).toHaveBeenCalledWith('sub1');
  });

  it('should throw if subscriptionId missing for unsubscribeFromPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.unsubscribeFromPush('school1', 'user1', '')).rejects.toThrow('subscriptionId is required');
  });

  it('should fetch push templates', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.getPushTemplates.mockResolvedValue([{ id: 't1' }]);
    const result = await service.getPushTemplates('school1', 'user1');
    expect(result).toEqual([{ id: 't1' }]);
  });

  it('should delete push template', async () => {
    const service = createPushService(mockRepository as any);
    await service.deletePushTemplate('t1', 'user1');
    expect(mockRepository.deletePushTemplate).toHaveBeenCalledWith('t1');
  });

  it('should get push stats', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.getPushStats.mockResolvedValue({ sent: 100 });
    const result = await service.getPushStats('school1');
    expect(result).toEqual({ sent: 100 });
  });

  it('should throw if schoolId missing for getPushStats', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.getPushStats('')).rejects.toThrow('schoolId is required');
  });

  it('should send bulk push', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.sendBulkPush.mockResolvedValue({ id: 'bp1', status: 'sending' });
    const result = await service.sendBulkPush('school1', 'user1', { title: 'Alert', body: 'Hi', recipients: ['u1', 'u2'] });
    expect(result.status).toBe('sending');
  });

  it('should throw if recipients empty for sendBulkPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendBulkPush('school1', 'user1', { title: 'Alert', body: 'Hi', recipients: [] })).rejects.toThrow('recipients are required');
  });

  it('should throw if title missing for sendBulkPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendBulkPush('school1', 'user1', { body: 'Hi', recipients: ['u1'] })).rejects.toThrow('notification title is required');
  });

  it('should throw if body missing for sendBulkPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendBulkPush('school1', 'user1', { title: 'Hi', recipients: ['u1'] })).rejects.toThrow('notification body is required');
  });

  it('should throw if templateId missing for deletePushTemplate', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.deletePushTemplate('', 'user1')).rejects.toThrow('templateId is required');
  });

  it('should throw if userId missing for deletePushTemplate', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.deletePushTemplate('t1', '')).rejects.toThrow('userId is required');
  });

  it('should handle getPushNotifications with filters', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.getPushNotifications.mockResolvedValue([]);
    await service.getPushNotifications('school1', 'user1', { read: false });
    expect(mockRepository.getPushNotifications).toHaveBeenCalledWith('school1', 'user1', { read: false });
  });

  it('should handle getPushTemplates with filters', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.getPushTemplates.mockResolvedValue([]);
    await service.getPushTemplates('school1', 'user1', { limit: 5 });
    expect(mockRepository.getPushTemplates).toHaveBeenCalledWith('school1', { limit: 5 });
  });

  it('should handle getPushStats with date range', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.getPushStats.mockResolvedValue({ sent: 50 });
    await service.getPushStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getPushStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on sendPushNotification', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.sendPushNotification.mockResolvedValue({ id: 'p1' });
    await service.sendPushNotification('school1', 'user1', { title: 'T', body: 'B' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'push.sent', expect.any(Object));
  });

  it('should log event on subscribeToPush', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.subscribeToPush.mockResolvedValue({ id: 'sub1' });
    await service.subscribeToPush('school1', 'user1', { endpoint: 'https://push.example', keys: { p256dh: 'k', auth: 'a' } });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'push.subscribed', expect.any(Object));
  });

  it('should log event on unsubscribeFromPush', async () => {
    const service = createPushService(mockRepository as any);
    await service.unsubscribeFromPush('school1', 'user1', 'sub1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'push.unsubscribed', expect.any(Object));
  });

  it('should log event on sendBulkPush', async () => {
    const service = createPushService(mockRepository as any);
    mockRepository.sendBulkPush.mockResolvedValue({ id: 'bp1' });
    await service.sendBulkPush('school1', 'user1', { title: 'T', body: 'B', recipients: ['u1'] });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'push_bulk.sent', expect.any(Object));
  });

  it('should throw if userId missing for sendPushNotification', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendPushNotification('school1', '', { title: 'T', body: 'B' })).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for sendBulkPush', async () => {
    const service = createPushService(mockRepository as any);
    await expect(service.sendBulkPush('school1', '', { title: 'T', body: 'B', recipients: ['u1'] })).rejects.toThrow('userId is required');
  });
});
