import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiNotificationService } from '@/features/ai/services/ai-notification.service';
import { aiRepository } from '../repositories/ai.repository';

vi.mock('@/features/repositories/ai.repository', () => ({
  aiRepository: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AiNotificationService', () => {
  let service: AiNotificationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiNotificationService(null as any);
  });

  describe('getNotification', () => {
    it('should return a notification when found', async () => {
      const mockNotification = { id: '1', type: 'alert', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockNotification as any);
      const result = await service.getNotification('school-1', '1');
      expect(result).toEqual(mockNotification);
    });

    it('should throw error when notification not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getNotification('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listNotifications', () => {
    it('should return a list of notifications', async () => {
      const mockNotifications = [{ id: '1', type: 'alert' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockNotifications as any);
      const result = await service.listNotifications('school-1', {});
      expect(result).toEqual(mockNotifications);
    });

    it('should return empty array when no notifications found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listNotifications('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createNotification', () => {
    it('should create a notification and return it', async () => {
      const mockNotification = { id: '1', type: 'info' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockNotification as any);
      const result = await service.createNotification('school-1', { type: 'info' } as any);
      expect(result).toEqual(mockNotification);
    });
  });

  describe('updateNotification', () => {
    it('should update an existing notification', async () => {
      const mockNotification = { id: '1', read: false };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockNotification as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockNotification, read: true } as any);
      const result = await service.updateNotification('school-1', '1', { read: true } as any);
      expect(result.read).toBe(true);
    });

    it('should throw error when updating non-existent notification', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateNotification('school-1', 'nonexistent', { read: true } as any)).rejects.toThrow();
    });
  });

  describe('deleteNotification', () => {
    it('should delete an existing notification', async () => {
      const mockNotification = { id: '1', type: 'alert' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockNotification as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteNotification('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent notification', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteNotification('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('sendNotification', () => {
    it('should send a notification successfully', async () => {
      const mockResult = { sent: true, recipientCount: 5 };
      vi.mocked(aiRepository.sendNotification).mockResolvedValue(mockResult as any);
      const result = await service.sendNotification('school-1', { type: 'email', message: 'Test' } as any);
      expect(result.sent).toBe(true);
    });

    it('should handle send failures', async () => {
      vi.mocked(aiRepository.sendNotification).mockRejectedValue(new Error('Delivery failed'));
      await expect(service.sendNotification('school-1', { type: 'email', message: 'Test' } as any)).rejects.toThrow('Delivery failed');
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', async () => {
      vi.mocked(aiRepository.markAllAsRead).mockResolvedValue(undefined);
      await service.markAllAsRead('school-1', 'user-1');
      expect(aiRepository.markAllAsRead).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should handle mark as read errors', async () => {
      vi.mocked(aiRepository.markAllAsRead).mockRejectedValue(new Error('Update failed'));
      await expect(service.markAllAsRead('school-1', 'user-1')).rejects.toThrow('Update failed');
    });
  });

  describe('getUnreadCount', () => {
    it('should return unread notification count', async () => {
      vi.mocked(aiRepository.getUnreadCount).mockResolvedValue(3);
      const result = await service.getUnreadCount('school-1', 'user-1');
      expect(result).toBe(3);
    });

    it('should return 0 when no unread notifications', async () => {
      vi.mocked(aiRepository.getUnreadCount).mockResolvedValue(0);
      const result = await service.getUnreadCount('school-1', 'user-1');
      expect(result).toBe(0);
    });
  });
});
