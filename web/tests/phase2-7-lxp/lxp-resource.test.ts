import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpResourceService } from '@/features/lxp/services/lxp-resource.service';

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

describe('LxpResourceService', () => {
  let service: LxpResourceService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpResourceService(mockSupabase as never);
  });

  describe('GetResource', () => {
    it('should getResource resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetResource('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetResource('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getResource', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetResource('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getResource', async () => {
      await expect(service.GetResource('')).rejects.toThrow();
    });
  });
  describe('CreateResource', () => {
    it('should createResource resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateResource('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateResource('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createResource', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateResource('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createResource', async () => {
      await expect(service.CreateResource('')).rejects.toThrow();
    });
  });
  describe('UpdateResource', () => {
    it('should updateResource resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateResource('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateResource('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateResource', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateResource('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateResource', async () => {
      await expect(service.UpdateResource('')).rejects.toThrow();
    });
  });
  describe('DeleteResource', () => {
    it('should deleteResource resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteResource('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteResource('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteResource', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteResource('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteResource', async () => {
      await expect(service.DeleteResource('')).rejects.toThrow();
    });
  });
  describe('GetResourcesByLesson', () => {
    it('should getResourcesByLesson resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetResourcesByLesson('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetResourcesByLesson('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getResourcesByLesson', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetResourcesByLesson('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getResourcesByLesson', async () => {
      await expect(service.GetResourcesByLesson('')).rejects.toThrow();
    });
  });
  describe('GetResourcesByType', () => {
    it('should getResourcesByType resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetResourcesByType('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetResourcesByType('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getResourcesByType', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetResourcesByType('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getResourcesByType', async () => {
      await expect(service.GetResourcesByType('')).rejects.toThrow();
    });
  });
  describe('GetResourceStats', () => {
    it('should getResourceStats resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetResourceStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetResourceStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getResourceStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetResourceStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getResourceStats', async () => {
      await expect(service.GetResourceStats('')).rejects.toThrow();
    });
  });
  describe('ShareResource', () => {
    it('should shareResource resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ShareResource('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ShareResource('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during shareResource', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ShareResource('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for shareResource', async () => {
      await expect(service.ShareResource('')).rejects.toThrow();
    });
  });
  describe('GetSharedResources', () => {
    it('should getSharedResources resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSharedResources('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSharedResources('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSharedResources', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSharedResources('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSharedResources', async () => {
      await expect(service.GetSharedResources('')).rejects.toThrow();
    });
  });
  describe('GetResourceUsage', () => {
    it('should getResourceUsage resource successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetResourceUsage('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when resource not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetResourceUsage('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getResourceUsage', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetResourceUsage('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getResourceUsage', async () => {
      await expect(service.GetResourceUsage('')).rejects.toThrow();
    });
  });

});
