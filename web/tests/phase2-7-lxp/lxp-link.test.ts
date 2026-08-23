import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpLinkService } from '@/features/lxp/services/lxp-link.service';

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

describe('LxpLinkService', () => {
  let service: LxpLinkService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpLinkService(mockSupabase as never);
  });

  describe('GetLink', () => {
    it('should getLink link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetLink('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetLink('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getLink', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetLink('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getLink', async () => {
      await expect(service.GetLink('')).rejects.toThrow();
    });
  });
  describe('CreateLink', () => {
    it('should createLink link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateLink('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateLink('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createLink', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateLink('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createLink', async () => {
      await expect(service.CreateLink('')).rejects.toThrow();
    });
  });
  describe('UpdateLink', () => {
    it('should updateLink link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateLink('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateLink('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateLink', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateLink('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateLink', async () => {
      await expect(service.UpdateLink('')).rejects.toThrow();
    });
  });
  describe('DeleteLink', () => {
    it('should deleteLink link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteLink('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteLink('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteLink', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteLink('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteLink', async () => {
      await expect(service.DeleteLink('')).rejects.toThrow();
    });
  });
  describe('GetLinksByLesson', () => {
    it('should getLinksByLesson link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetLinksByLesson('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetLinksByLesson('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getLinksByLesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetLinksByLesson('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getLinksByLesson', async () => {
      await expect(service.GetLinksByLesson('')).rejects.toThrow();
    });
  });
  describe('GetLinksByCategory', () => {
    it('should getLinksByCategory link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetLinksByCategory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetLinksByCategory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getLinksByCategory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetLinksByCategory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getLinksByCategory', async () => {
      await expect(service.GetLinksByCategory('')).rejects.toThrow();
    });
  });
  describe('GetLinkStats', () => {
    it('should getLinkStats link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetLinkStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetLinkStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getLinkStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetLinkStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getLinkStats', async () => {
      await expect(service.GetLinkStats('')).rejects.toThrow();
    });
  });
  describe('ClickLink', () => {
    it('should clickLink link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ClickLink('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ClickLink('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during clickLink', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ClickLink('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for clickLink', async () => {
      await expect(service.ClickLink('')).rejects.toThrow();
    });
  });
  describe('GetPopularLinks', () => {
    it('should getPopularLinks link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPopularLinks('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPopularLinks('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPopularLinks', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPopularLinks('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPopularLinks', async () => {
      await expect(service.GetPopularLinks('')).rejects.toThrow();
    });
  });
  describe('GetLinkHistory', () => {
    it('should getLinkHistory link successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetLinkHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when link not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetLinkHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getLinkHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetLinkHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getLinkHistory', async () => {
      await expect(service.GetLinkHistory('')).rejects.toThrow();
    });
  });

});
