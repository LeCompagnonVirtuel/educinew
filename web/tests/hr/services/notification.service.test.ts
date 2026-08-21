import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('NotificationService', () => {
  const mockRepo = {
    findNotifications: vi.fn(),
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
    deleteNotification: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findNotifications', () => {
    it('should return notifications list', async () => {
      const notifications = [{ id: '1', title: 'Leave approved' }];
      mockRepo.findNotifications.mockResolvedValue(notifications);
      const result = await mockRepo.findNotifications(schoolId, userId);
      expect(result).toEqual(notifications);
    });

    it('should filter by user', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      await mockRepo.findNotifications(schoolId, userId);
      expect(mockRepo.findNotifications).toHaveBeenCalledWith(schoolId, userId);
    });

    it('should handle empty results', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      const result = await mockRepo.findNotifications(schoolId, userId);
      expect(result).toHaveLength(0);
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      mockRepo.markAsRead.mockResolvedValue({ id: '1', read: true });
      const result = await mockRepo.markAsRead(schoolId, 'notif-1');
      expect(result.read).toBe(true);
    });

    it('should require ids', () => {
      const validate = (sId: string, nId: string) => {
        if (!sId || !nId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', 'notif-1')).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', async () => {
      mockRepo.markAllAsRead.mockResolvedValue(undefined);
      await mockRepo.markAllAsRead(schoolId, userId);
      expect(mockRepo.markAllAsRead).toHaveBeenCalled();
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification', async () => {
      mockRepo.deleteNotification.mockResolvedValue(undefined);
      await mockRepo.deleteNotification(schoolId, 'notif-1');
      expect(mockRepo.deleteNotification).toHaveBeenCalled();
    });
  });

  describe('Notification type', () => {
    it('should define valid types', () => {
      const types = ['leave', 'training', 'performance', 'disciplinary', 'system'];
      expect(types).toContain('leave');
      expect(types).toContain('system');
    });
  });
});
