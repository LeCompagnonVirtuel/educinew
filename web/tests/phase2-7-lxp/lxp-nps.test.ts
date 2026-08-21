import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpNpsService } from '@/features/lxp/services/lxp-nps.service';

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

describe('LxpNpsService', () => {
  let service: LxpNpsService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpNpsService(mockSupabase as never);
  });

  describe('GetNps', () => {
    it('should getNps nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNps('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNps('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNps', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNps('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNps', async () => {
      await expect(service.GetNps('')).rejects.toThrow();
    });
  });
  describe('CreateNps', () => {
    it('should createNps nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateNps('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateNps('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createNps', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateNps('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createNps', async () => {
      await expect(service.CreateNps('')).rejects.toThrow();
    });
  });
  describe('UpdateNps', () => {
    it('should updateNps nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateNps('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateNps('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateNps', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateNps('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateNps', async () => {
      await expect(service.UpdateNps('')).rejects.toThrow();
    });
  });
  describe('DeleteNps', () => {
    it('should deleteNps nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteNps('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteNps('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteNps', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteNps('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteNps', async () => {
      await expect(service.DeleteNps('')).rejects.toThrow();
    });
  });
  describe('SubmitNpsResponse', () => {
    it('should submitNpsResponse nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.SubmitNpsResponse('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.SubmitNpsResponse('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during submitNpsResponse', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.SubmitNpsResponse('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for submitNpsResponse', async () => {
      await expect(service.SubmitNpsResponse('')).rejects.toThrow();
    });
  });
  describe('GetNpsScore', () => {
    it('should getNpsScore nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNpsScore('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNpsScore('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNpsScore', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNpsScore('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNpsScore', async () => {
      await expect(service.GetNpsScore('')).rejects.toThrow();
    });
  });
  describe('GetNpsTrends', () => {
    it('should getNpsTrends nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNpsTrends('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNpsTrends('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNpsTrends', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNpsTrends('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNpsTrends', async () => {
      await expect(service.GetNpsTrends('')).rejects.toThrow();
    });
  });
  describe('GetNpsSegments', () => {
    it('should getNpsSegments nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNpsSegments('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNpsSegments('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNpsSegments', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNpsSegments('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNpsSegments', async () => {
      await expect(service.GetNpsSegments('')).rejects.toThrow();
    });
  });
  describe('GetNpsInsights', () => {
    it('should getNpsInsights nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNpsInsights('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNpsInsights('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNpsInsights', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNpsInsights('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNpsInsights', async () => {
      await expect(service.GetNpsInsights('')).rejects.toThrow();
    });
  });
  describe('GetNpsHistory', () => {
    it('should getNpsHistory nps successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetNpsHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when nps not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetNpsHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getNpsHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetNpsHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getNpsHistory', async () => {
      await expect(service.GetNpsHistory('')).rejects.toThrow();
    });
  });

});
