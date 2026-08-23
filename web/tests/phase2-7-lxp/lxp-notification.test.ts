import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpNotificationService } from '@/features/lxp/services/lxp-notification.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpNotificationService', () => {
  let service: LxpNotificationService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpNotificationService(mockSupabase as never);
  });

  describe('GetNotification', () => {
    it('should getNotification notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNotification('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNotification('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNotification', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNotification('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNotification', async () => {
      await expect(service.GetNotification('')).rejects.toThrow();
    });
  });
  describe('CreateNotification', () => {
    it('should createNotification notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateNotification('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateNotification('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createNotification', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateNotification('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createNotification', async () => {
      await expect(service.CreateNotification('')).rejects.toThrow();
    });
  });
  describe('UpdateNotification', () => {
    it('should updateNotification notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateNotification('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateNotification('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateNotification', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateNotification('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateNotification', async () => {
      await expect(service.UpdateNotification('')).rejects.toThrow();
    });
  });
  describe('DeleteNotification', () => {
    it('should deleteNotification notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteNotification('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteNotification('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteNotification', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteNotification('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteNotification', async () => {
      await expect(service.DeleteNotification('')).rejects.toThrow();
    });
  });
  describe('MarkAsRead', () => {
    it('should markAsRead notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.MarkAsRead('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.MarkAsRead('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during markAsRead', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.MarkAsRead('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for markAsRead', async () => {
      await expect(service.MarkAsRead('')).rejects.toThrow();
    });
  });
  describe('MarkAllAsRead', () => {
    it('should markAllAsRead notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.MarkAllAsRead('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.MarkAllAsRead('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during markAllAsRead', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.MarkAllAsRead('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for markAllAsRead', async () => {
      await expect(service.MarkAllAsRead('')).rejects.toThrow();
    });
  });
  describe('GetUnreadCount', () => {
    it('should getUnreadCount notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetUnreadCount('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetUnreadCount('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getUnreadCount', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetUnreadCount('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getUnreadCount', async () => {
      await expect(service.GetUnreadCount('')).rejects.toThrow();
    });
  });
  describe('GetNotificationPreferences', () => {
    it('should getNotificationPreferences notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNotificationPreferences('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNotificationPreferences('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNotificationPreferences', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNotificationPreferences('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNotificationPreferences', async () => {
      await expect(service.GetNotificationPreferences('')).rejects.toThrow();
    });
  });
  describe('UpdatePreferences', () => {
    it('should updatePreferences notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdatePreferences('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdatePreferences('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updatePreferences', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdatePreferences('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updatePreferences', async () => {
      await expect(service.UpdatePreferences('')).rejects.toThrow();
    });
  });
  describe('GetNotificationHistory', () => {
    it('should getNotificationHistory notification successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNotificationHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when notification not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNotificationHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNotificationHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNotificationHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNotificationHistory', async () => {
      await expect(service.GetNotificationHistory('')).rejects.toThrow();
    });
  });

});
