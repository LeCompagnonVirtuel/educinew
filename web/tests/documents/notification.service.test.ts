import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createNotificationService } from '../../src/features/documents/services/notification.service';

describe('NotificationService', () => {
  let mockRepository: {
    getNotifications: ReturnType<typeof vi.fn>;
    createNotification: ReturnType<typeof vi.fn>;
    markNotificationRead: ReturnType<typeof vi.fn>;
    markAllNotificationsRead: ReturnType<typeof vi.fn>;
    deleteNotification: ReturnType<typeof vi.fn>;
    getUnreadNotificationCount: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getNotifications: vi.fn(),
      createNotification: vi.fn(),
      markNotificationRead: vi.fn(),
      markAllNotificationsRead: vi.fn(),
      deleteNotification: vi.fn(),
      getUnreadNotificationCount: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createNotificationService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getNotifications).toBeInstanceOf(Function);
    expect(service.createNotification).toBeInstanceOf(Function);
    expect(service.markNotificationRead).toBeInstanceOf(Function);
    expect(service.markAllNotificationsRead).toBeInstanceOf(Function);
    expect(service.deleteNotification).toBeInstanceOf(Function);
    expect(service.getUnreadNotificationCount).toBeInstanceOf(Function);
  });

  describe('getNotifications', () => {
    it('should return notifications', async () => {
      const notifications = [{ id: 'n-1', type: 'comment', read: false }];
      mockRepository.getNotifications.mockResolvedValue(notifications);
      const service = createNotificationService(mockRepository as any);
      const result = await service.getNotifications('school-1', 'user-1');
      expect(result).toEqual(notifications);
      expect(mockRepository.getNotifications).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should return empty list when no notifications', async () => {
      mockRepository.getNotifications.mockResolvedValue([]);
      const service = createNotificationService(mockRepository as any);
      const result = await service.getNotifications('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple notifications', async () => {
      mockRepository.getNotifications.mockResolvedValue([{ id: 'n-1' }, { id: 'n-2' }]);
      const service = createNotificationService(mockRepository as any);
      const result = await service.getNotifications('school-1', 'user-1');
      expect(result).toHaveLength(2);
    });

    it('should throw if schoolId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getNotifications('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getNotifications('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getNotifications('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getNotifications.mockRejectedValue(new Error('DB error'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.getNotifications('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow errors', async () => {
      mockRepository.getNotifications.mockRejectedValue(new Error('Connection timeout'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.getNotifications('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('createNotification', () => {
    it('should create a notification', async () => {
      const data = { type: 'approval', message: 'Document needs review' };
      const created = { id: 'n-1', ...data, userId: 'user-1' };
      mockRepository.createNotification.mockResolvedValue(created);
      const service = createNotificationService(mockRepository as any);
      const result = await service.createNotification('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createNotification).toHaveBeenCalledWith({ ...data, userId: 'user-1' }, 'school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('', 'user-1', { type: 'comment' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('school-1', '', { type: 'comment' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('school-1', 'user-1', null as any)).rejects.toThrow('notification type is required');
    });

    it('should throw if type missing from data', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('school-1', 'user-1', {})).rejects.toThrow('notification type is required');
    });

    it('should throw if both schoolId and userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('', '', { type: 'comment' })).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.createNotification.mockRejectedValue(new Error('Create failed'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('school-1', 'user-1', { type: 'comment' })).rejects.toThrow('Create failed');
    });
  });

  describe('markNotificationRead', () => {
    it('should mark notification as read', async () => {
      const notification = { id: 'n-1', read: true };
      mockRepository.markNotificationRead.mockResolvedValue(notification);
      const service = createNotificationService(mockRepository as any);
      const result = await service.markNotificationRead('n-1', 'user-1');
      expect(result).toEqual(notification);
      expect(mockRepository.markNotificationRead).toHaveBeenCalledWith('n-1');
    });

    it('should throw if notificationId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markNotificationRead('', 'user-1')).rejects.toThrow('notificationId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markNotificationRead('n-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markNotificationRead('', '')).rejects.toThrow('notificationId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.markNotificationRead.mockRejectedValue(new Error('Mark failed'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.markNotificationRead('n-1', 'user-1')).rejects.toThrow('Mark failed');
    });
  });

  describe('markAllNotificationsRead', () => {
    it('should mark all notifications as read', async () => {
      mockRepository.markAllNotificationsRead.mockResolvedValue(undefined);
      const service = createNotificationService(mockRepository as any);
      await service.markAllNotificationsRead('school-1', 'user-1');
      expect(mockRepository.markAllNotificationsRead).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markAllNotificationsRead('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markAllNotificationsRead('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markAllNotificationsRead('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.markAllNotificationsRead.mockRejectedValue(new Error('Mark all failed'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.markAllNotificationsRead('school-1', 'user-1')).rejects.toThrow('Mark all failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.markAllNotificationsRead.mockRejectedValue(new Error('Permission denied'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.markAllNotificationsRead('school-1', 'user-1')).rejects.toThrow('Permission denied');
    });
  });

  describe('deleteNotification', () => {
    it('should delete a notification', async () => {
      mockRepository.deleteNotification.mockResolvedValue(undefined);
      const service = createNotificationService(mockRepository as any);
      await service.deleteNotification('n-1', 'user-1');
      expect(mockRepository.deleteNotification).toHaveBeenCalledWith('n-1');
    });

    it('should throw if notificationId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.deleteNotification('', 'user-1')).rejects.toThrow('notificationId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.deleteNotification('n-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.deleteNotification('', '')).rejects.toThrow('notificationId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.deleteNotification.mockRejectedValue(new Error('Delete failed'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.deleteNotification('n-1', 'user-1')).rejects.toThrow('Delete failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.deleteNotification.mockRejectedValue(new Error('Not found'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.deleteNotification('n-1', 'user-1')).rejects.toThrow('Not found');
    });
  });

  describe('getUnreadNotificationCount', () => {
    it('should return unread notification count', async () => {
      mockRepository.getUnreadNotificationCount.mockResolvedValue(5);
      const service = createNotificationService(mockRepository as any);
      const result = await service.getUnreadNotificationCount('school-1', 'user-1');
      expect(result).toBe(5);
      expect(mockRepository.getUnreadNotificationCount).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should return zero when no unread notifications', async () => {
      mockRepository.getUnreadNotificationCount.mockResolvedValue(0);
      const service = createNotificationService(mockRepository as any);
      const result = await service.getUnreadNotificationCount('school-1', 'user-1');
      expect(result).toBe(0);
    });

    it('should throw if schoolId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getUnreadNotificationCount('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getUnreadNotificationCount('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getUnreadNotificationCount('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getUnreadNotificationCount.mockRejectedValue(new Error('Count query failed'));
      const service = createNotificationService(mockRepository as any);
      await expect(service.getUnreadNotificationCount('school-1', 'user-1')).rejects.toThrow('Count query failed');
    });

    it('should return large count', async () => {
      mockRepository.getUnreadNotificationCount.mockResolvedValue(999);
      const service = createNotificationService(mockRepository as any);
      const result = await service.getUnreadNotificationCount('school-1', 'user-1');
      expect(result).toBe(999);
    });
  });

  describe('method existence', () => {
    it('should have all 6 methods defined', () => {
      const service = createNotificationService(mockRepository as any);
      const methods = ['getNotifications', 'createNotification', 'markNotificationRead', 'markAllNotificationsRead', 'deleteNotification', 'getUnreadNotificationCount'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createNotificationService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(6);
    });

    it('should pass correct arguments to getNotifications', async () => {
      mockRepository.getNotifications.mockResolvedValue([]);
      const service = createNotificationService(mockRepository as any);
      await service.getNotifications('school-1', 'user-1');
      expect(mockRepository.getNotifications).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should pass correct arguments to createNotification', async () => {
      mockRepository.createNotification.mockResolvedValue({ id: 'n-1' });
      const service = createNotificationService(mockRepository as any);
      await service.createNotification('school-1', 'user-1', { type: 'comment' });
      expect(mockRepository.createNotification).toHaveBeenCalledWith({ type: 'comment', userId: 'user-1' }, 'school-1');
    });

    it('should pass correct arguments to markNotificationRead', async () => {
      mockRepository.markNotificationRead.mockResolvedValue({ id: 'n-1', read: true });
      const service = createNotificationService(mockRepository as any);
      await service.markNotificationRead('n-1', 'user-1');
      expect(mockRepository.markNotificationRead).toHaveBeenCalledWith('n-1');
    });

    it('should pass correct arguments to deleteNotification', async () => {
      mockRepository.deleteNotification.mockResolvedValue(undefined);
      const service = createNotificationService(mockRepository as any);
      await service.deleteNotification('n-1', 'user-1');
      expect(mockRepository.deleteNotification).toHaveBeenCalledWith('n-1');
    });

    it('should validate schoolId before repository in getNotifications', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.getNotifications('', 'user-1')).rejects.toThrow();
      expect(mockRepository.getNotifications).not.toHaveBeenCalled();
    });

    it('should validate data before repository in createNotification', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.createNotification('school-1', 'user-1', {})).rejects.toThrow();
      expect(mockRepository.createNotification).not.toHaveBeenCalled();
    });

    it('should validate notificationId before repository in markNotificationRead', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.markNotificationRead('', 'user-1')).rejects.toThrow();
      expect(mockRepository.markNotificationRead).not.toHaveBeenCalled();
    });

    it('should validate notificationId before repository in deleteNotification', async () => {
      const service = createNotificationService(mockRepository as any);
      await expect(service.deleteNotification('', 'user-1')).rejects.toThrow();
      expect(mockRepository.deleteNotification).not.toHaveBeenCalled();
    });
  });
});
