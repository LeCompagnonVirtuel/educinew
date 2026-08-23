import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpGlossaryService } from '@/features/lxp/services/lxp-glossary.service';

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

describe('LxpGlossaryService', () => {
  let service: LxpGlossaryService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpGlossaryService(mockSupabase as never);
  });

  describe('GetGlossaryTerm', () => {
    it('should getGlossaryTerm glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetGlossaryTerm('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetGlossaryTerm('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getGlossaryTerm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetGlossaryTerm('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getGlossaryTerm', async () => {
      await expect(service.GetGlossaryTerm('')).rejects.toThrow();
    });
  });
  describe('CreateGlossaryTerm', () => {
    it('should createGlossaryTerm glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateGlossaryTerm('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateGlossaryTerm('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createGlossaryTerm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateGlossaryTerm('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createGlossaryTerm', async () => {
      await expect(service.CreateGlossaryTerm('')).rejects.toThrow();
    });
  });
  describe('UpdateGlossaryTerm', () => {
    it('should updateGlossaryTerm glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateGlossaryTerm('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateGlossaryTerm('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateGlossaryTerm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateGlossaryTerm('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateGlossaryTerm', async () => {
      await expect(service.UpdateGlossaryTerm('')).rejects.toThrow();
    });
  });
  describe('DeleteGlossaryTerm', () => {
    it('should deleteGlossaryTerm glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteGlossaryTerm('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteGlossaryTerm('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteGlossaryTerm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteGlossaryTerm('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteGlossaryTerm', async () => {
      await expect(service.DeleteGlossaryTerm('')).rejects.toThrow();
    });
  });
  describe('SearchTerms', () => {
    it('should searchTerms glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.SearchTerms('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.SearchTerms('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during searchTerms', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.SearchTerms('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for searchTerms', async () => {
      await expect(service.SearchTerms('')).rejects.toThrow();
    });
  });
  describe('GetTermsByCategory', () => {
    it('should getTermsByCategory glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetTermsByCategory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetTermsByCategory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getTermsByCategory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetTermsByCategory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getTermsByCategory', async () => {
      await expect(service.GetTermsByCategory('')).rejects.toThrow();
    });
  });
  describe('GetGlossaryStats', () => {
    it('should getGlossaryStats glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetGlossaryStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetGlossaryStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getGlossaryStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetGlossaryStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getGlossaryStats', async () => {
      await expect(service.GetGlossaryStats('')).rejects.toThrow();
    });
  });
  describe('GetRelatedTerms', () => {
    it('should getRelatedTerms glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetRelatedTerms('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetRelatedTerms('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getRelatedTerms', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetRelatedTerms('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getRelatedTerms', async () => {
      await expect(service.GetRelatedTerms('')).rejects.toThrow();
    });
  });
  describe('GetTermHistory', () => {
    it('should getTermHistory glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetTermHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetTermHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getTermHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetTermHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getTermHistory', async () => {
      await expect(service.GetTermHistory('')).rejects.toThrow();
    });
  });
  describe('GetPopularTerms', () => {
    it('should getPopularTerms glossary term successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPopularTerms('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when glossary term not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPopularTerms('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPopularTerms', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPopularTerms('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPopularTerms', async () => {
      await expect(service.GetPopularTerms('')).rejects.toThrow();
    });
  });

});
