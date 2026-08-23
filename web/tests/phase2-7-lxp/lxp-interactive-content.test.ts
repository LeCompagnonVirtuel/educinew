import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpInteractiveContentService } from '@/features/lxp/services/lxp-interactive-content.service';

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

describe('LxpInteractiveContentService', () => {
  let service: LxpInteractiveContentService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpInteractiveContentService(mockSupabase as never);
  });

  describe('GetInteractive', () => {
    it('should getInteractive interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetInteractive('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetInteractive('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getInteractive', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetInteractive('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getInteractive', async () => {
      await expect(service.GetInteractive('')).rejects.toThrow();
    });
  });
  describe('CreateInteractive', () => {
    it('should createInteractive interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateInteractive('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateInteractive('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createInteractive', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateInteractive('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createInteractive', async () => {
      await expect(service.CreateInteractive('')).rejects.toThrow();
    });
  });
  describe('UpdateInteractive', () => {
    it('should updateInteractive interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateInteractive('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateInteractive('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateInteractive', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateInteractive('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateInteractive', async () => {
      await expect(service.UpdateInteractive('')).rejects.toThrow();
    });
  });
  describe('DeleteInteractive', () => {
    it('should deleteInteractive interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteInteractive('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteInteractive('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteInteractive', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteInteractive('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteInteractive', async () => {
      await expect(service.DeleteInteractive('')).rejects.toThrow();
    });
  });
  describe('GetInteractivePreview', () => {
    it('should getInteractivePreview interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetInteractivePreview('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetInteractivePreview('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getInteractivePreview', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetInteractivePreview('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getInteractivePreview', async () => {
      await expect(service.GetInteractivePreview('')).rejects.toThrow();
    });
  });
  describe('GetInteractiveAnalytics', () => {
    it('should getInteractiveAnalytics interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetInteractiveAnalytics('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetInteractiveAnalytics('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getInteractiveAnalytics', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetInteractiveAnalytics('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getInteractiveAnalytics', async () => {
      await expect(service.GetInteractiveAnalytics('')).rejects.toThrow();
    });
  });
  describe('GetInteractivesByLesson', () => {
    it('should getInteractivesByLesson interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetInteractivesByLesson('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetInteractivesByLesson('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getInteractivesByLesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetInteractivesByLesson('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getInteractivesByLesson', async () => {
      await expect(service.GetInteractivesByLesson('')).rejects.toThrow();
    });
  });
  describe('GetInteractiveStats', () => {
    it('should getInteractiveStats interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetInteractiveStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetInteractiveStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getInteractiveStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetInteractiveStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getInteractiveStats', async () => {
      await expect(service.GetInteractiveStats('')).rejects.toThrow();
    });
  });
  describe('GetPopularInteractives', () => {
    it('should getPopularInteractives interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPopularInteractives('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPopularInteractives('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPopularInteractives', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPopularInteractives('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPopularInteractives', async () => {
      await expect(service.GetPopularInteractives('')).rejects.toThrow();
    });
  });
  describe('GetInteractiveHistory', () => {
    it('should getInteractiveHistory interactive content successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetInteractiveHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when interactive content not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetInteractiveHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getInteractiveHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetInteractiveHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getInteractiveHistory', async () => {
      await expect(service.GetInteractiveHistory('')).rejects.toThrow();
    });
  });

});
