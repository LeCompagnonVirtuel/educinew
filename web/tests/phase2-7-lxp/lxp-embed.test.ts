import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpEmbedService } from '@/features/lxp/services/lxp-embed.service';

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

describe('LxpEmbedService', () => {
  let service: LxpEmbedService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpEmbedService(mockSupabase as never);
  });

  describe('GetEmbed', () => {
    it('should getEmbed embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetEmbed('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetEmbed('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getEmbed', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetEmbed('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getEmbed', async () => {
      await expect(service.GetEmbed('')).rejects.toThrow();
    });
  });
  describe('CreateEmbed', () => {
    it('should createEmbed embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateEmbed('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateEmbed('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createEmbed', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateEmbed('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createEmbed', async () => {
      await expect(service.CreateEmbed('')).rejects.toThrow();
    });
  });
  describe('UpdateEmbed', () => {
    it('should updateEmbed embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateEmbed('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateEmbed('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateEmbed', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateEmbed('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateEmbed', async () => {
      await expect(service.UpdateEmbed('')).rejects.toThrow();
    });
  });
  describe('DeleteEmbed', () => {
    it('should deleteEmbed embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteEmbed('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteEmbed('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteEmbed', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteEmbed('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteEmbed', async () => {
      await expect(service.DeleteEmbed('')).rejects.toThrow();
    });
  });
  describe('GetEmbedCode', () => {
    it('should getEmbedCode embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetEmbedCode('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetEmbedCode('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getEmbedCode', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetEmbedCode('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getEmbedCode', async () => {
      await expect(service.GetEmbedCode('')).rejects.toThrow();
    });
  });
  describe('GetEmbedPreview', () => {
    it('should getEmbedPreview embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetEmbedPreview('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetEmbedPreview('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getEmbedPreview', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetEmbedPreview('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getEmbedPreview', async () => {
      await expect(service.GetEmbedPreview('')).rejects.toThrow();
    });
  });
  describe('GetEmbedsByLesson', () => {
    it('should getEmbedsByLesson embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetEmbedsByLesson('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetEmbedsByLesson('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getEmbedsByLesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetEmbedsByLesson('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getEmbedsByLesson', async () => {
      await expect(service.GetEmbedsByLesson('')).rejects.toThrow();
    });
  });
  describe('GetEmbedStats', () => {
    it('should getEmbedStats embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetEmbedStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetEmbedStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getEmbedStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetEmbedStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getEmbedStats', async () => {
      await expect(service.GetEmbedStats('')).rejects.toThrow();
    });
  });
  describe('GetEmbedAnalytics', () => {
    it('should getEmbedAnalytics embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetEmbedAnalytics('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetEmbedAnalytics('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getEmbedAnalytics', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetEmbedAnalytics('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getEmbedAnalytics', async () => {
      await expect(service.GetEmbedAnalytics('')).rejects.toThrow();
    });
  });
  describe('GetPopularEmbeds', () => {
    it('should getPopularEmbeds embed successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPopularEmbeds('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when embed not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPopularEmbeds('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPopularEmbeds', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPopularEmbeds('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPopularEmbeds', async () => {
      await expect(service.GetPopularEmbeds('')).rejects.toThrow();
    });
  });

});
