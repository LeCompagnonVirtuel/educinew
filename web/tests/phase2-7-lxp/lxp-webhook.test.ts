import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpWebhookService } from '@/features/lxp/services/lxp-webhook.service';

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

describe('LxpWebhookService', () => {
  let service: LxpWebhookService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpWebhookService(mockSupabase as never);
  });

  describe('GetWebhook', () => {
    it('should getWebhook webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetWebhook('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetWebhook('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getWebhook', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetWebhook('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getWebhook', async () => {
      await expect(service.GetWebhook('')).rejects.toThrow();
    });
  });
  describe('CreateWebhook', () => {
    it('should createWebhook webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateWebhook('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateWebhook('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createWebhook', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateWebhook('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createWebhook', async () => {
      await expect(service.CreateWebhook('')).rejects.toThrow();
    });
  });
  describe('UpdateWebhook', () => {
    it('should updateWebhook webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateWebhook('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateWebhook('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateWebhook', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateWebhook('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateWebhook', async () => {
      await expect(service.UpdateWebhook('')).rejects.toThrow();
    });
  });
  describe('DeleteWebhook', () => {
    it('should deleteWebhook webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteWebhook('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteWebhook('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteWebhook', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteWebhook('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteWebhook', async () => {
      await expect(service.DeleteWebhook('')).rejects.toThrow();
    });
  });
  describe('TestWebhook', () => {
    it('should testWebhook webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.TestWebhook('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.TestWebhook('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during testWebhook', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.TestWebhook('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for testWebhook', async () => {
      await expect(service.TestWebhook('')).rejects.toThrow();
    });
  });
  describe('GetWebhookLogs', () => {
    it('should getWebhookLogs webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetWebhookLogs('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetWebhookLogs('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getWebhookLogs', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetWebhookLogs('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getWebhookLogs', async () => {
      await expect(service.GetWebhookLogs('')).rejects.toThrow();
    });
  });
  describe('RetryWebhook', () => {
    it('should retryWebhook webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.RetryWebhook('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.RetryWebhook('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during retryWebhook', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.RetryWebhook('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for retryWebhook', async () => {
      await expect(service.RetryWebhook('')).rejects.toThrow();
    });
  });
  describe('GetWebhookStats', () => {
    it('should getWebhookStats webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetWebhookStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetWebhookStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getWebhookStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetWebhookStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getWebhookStats', async () => {
      await expect(service.GetWebhookStats('')).rejects.toThrow();
    });
  });
  describe('GetWebhookEvents', () => {
    it('should getWebhookEvents webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetWebhookEvents('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetWebhookEvents('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getWebhookEvents', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetWebhookEvents('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getWebhookEvents', async () => {
      await expect(service.GetWebhookEvents('')).rejects.toThrow();
    });
  });
  describe('GetWebhookHistory', () => {
    it('should getWebhookHistory webhook successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetWebhookHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when webhook not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetWebhookHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getWebhookHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetWebhookHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getWebhookHistory', async () => {
      await expect(service.GetWebhookHistory('')).rejects.toThrow();
    });
  });

});
