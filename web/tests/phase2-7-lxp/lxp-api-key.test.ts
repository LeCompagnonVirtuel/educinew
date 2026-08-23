import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpApiKeyService } from '@/features/lxp/services/lxp-api-key.service';

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

describe('LxpApiKeyService', () => {
  let service: LxpApiKeyService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpApiKeyService(mockSupabase as never);
  });

  describe('GetApiKey', () => {
    it('should getApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getApiKey', async () => {
      await expect(service.GetApiKey('')).rejects.toThrow();
    });
  });
  describe('CreateApiKey', () => {
    it('should createApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createApiKey', async () => {
      await expect(service.CreateApiKey('')).rejects.toThrow();
    });
  });
  describe('UpdateApiKey', () => {
    it('should updateApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateApiKey', async () => {
      await expect(service.UpdateApiKey('')).rejects.toThrow();
    });
  });
  describe('DeleteApiKey', () => {
    it('should deleteApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteApiKey', async () => {
      await expect(service.DeleteApiKey('')).rejects.toThrow();
    });
  });
  describe('RevokeApiKey', () => {
    it('should revokeApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.RevokeApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.RevokeApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during revokeApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.RevokeApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for revokeApiKey', async () => {
      await expect(service.RevokeApiKey('')).rejects.toThrow();
    });
  });
  describe('GetApiKeyUsage', () => {
    it('should getApiKeyUsage api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetApiKeyUsage('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetApiKeyUsage('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getApiKeyUsage', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetApiKeyUsage('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getApiKeyUsage', async () => {
      await expect(service.GetApiKeyUsage('')).rejects.toThrow();
    });
  });
  describe('GetApiKeyStats', () => {
    it('should getApiKeyStats api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetApiKeyStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetApiKeyStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getApiKeyStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetApiKeyStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getApiKeyStats', async () => {
      await expect(service.GetApiKeyStats('')).rejects.toThrow();
    });
  });
  describe('ValidateApiKey', () => {
    it('should validateApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ValidateApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ValidateApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during validateApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ValidateApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for validateApiKey', async () => {
      await expect(service.ValidateApiKey('')).rejects.toThrow();
    });
  });
  describe('GetApiKeyPermissions', () => {
    it('should getApiKeyPermissions api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetApiKeyPermissions('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetApiKeyPermissions('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getApiKeyPermissions', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetApiKeyPermissions('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getApiKeyPermissions', async () => {
      await expect(service.GetApiKeyPermissions('')).rejects.toThrow();
    });
  });
  describe('RotateApiKey', () => {
    it('should rotateApiKey api key successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.RotateApiKey('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when api key not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.RotateApiKey('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during rotateApiKey', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.RotateApiKey('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for rotateApiKey', async () => {
      await expect(service.RotateApiKey('')).rejects.toThrow();
    });
  });

});
