import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpCodeSnippetService } from '@/features/lxp/services/lxp-code-snippet.service';

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

describe('LxpCodeSnippetService', () => {
  let service: LxpCodeSnippetService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpCodeSnippetService(mockSupabase as never);
  });

  describe('GetSnippet', () => {
    it('should getSnippet code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSnippet('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSnippet('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSnippet', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSnippet('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSnippet', async () => {
      await expect(service.GetSnippet('')).rejects.toThrow();
    });
  });
  describe('CreateSnippet', () => {
    it('should createSnippet code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateSnippet('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateSnippet('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createSnippet', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateSnippet('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createSnippet', async () => {
      await expect(service.CreateSnippet('')).rejects.toThrow();
    });
  });
  describe('UpdateSnippet', () => {
    it('should updateSnippet code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateSnippet('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateSnippet('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateSnippet', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateSnippet('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateSnippet', async () => {
      await expect(service.UpdateSnippet('')).rejects.toThrow();
    });
  });
  describe('DeleteSnippet', () => {
    it('should deleteSnippet code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteSnippet('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteSnippet('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteSnippet', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteSnippet('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteSnippet', async () => {
      await expect(service.DeleteSnippet('')).rejects.toThrow();
    });
  });
  describe('ForkSnippet', () => {
    it('should forkSnippet code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ForkSnippet('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ForkSnippet('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during forkSnippet', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ForkSnippet('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for forkSnippet', async () => {
      await expect(service.ForkSnippet('')).rejects.toThrow();
    });
  });
  describe('GetSnippetsByLesson', () => {
    it('should getSnippetsByLesson code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSnippetsByLesson('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSnippetsByLesson('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSnippetsByLesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSnippetsByLesson('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSnippetsByLesson', async () => {
      await expect(service.GetSnippetsByLesson('')).rejects.toThrow();
    });
  });
  describe('GetSnippetsByLanguage', () => {
    it('should getSnippetsByLanguage code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSnippetsByLanguage('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSnippetsByLanguage('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSnippetsByLanguage', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSnippetsByLanguage('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSnippetsByLanguage', async () => {
      await expect(service.GetSnippetsByLanguage('')).rejects.toThrow();
    });
  });
  describe('GetSnippetStats', () => {
    it('should getSnippetStats code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSnippetStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSnippetStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSnippetStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSnippetStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSnippetStats', async () => {
      await expect(service.GetSnippetStats('')).rejects.toThrow();
    });
  });
  describe('GetPopularSnippets', () => {
    it('should getPopularSnippets code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPopularSnippets('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPopularSnippets('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPopularSnippets', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPopularSnippets('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPopularSnippets', async () => {
      await expect(service.GetPopularSnippets('')).rejects.toThrow();
    });
  });
  describe('GetSnippetHistory', () => {
    it('should getSnippetHistory code snippet successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSnippetHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when code snippet not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSnippetHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSnippetHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSnippetHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSnippetHistory', async () => {
      await expect(service.GetSnippetHistory('')).rejects.toThrow();
    });
  });

});
