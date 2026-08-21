import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpOauthService } from '@/features/lxp/services/lxp-oauth.service';

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

describe('LxpOauthService', () => {
  let service: LxpOauthService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpOauthService(mockSupabase as never);
  });

  describe('GetOauth', () => {
    it('should getOauth oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetOauth('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetOauth('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getOauth', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetOauth('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getOauth', async () => {
      await expect(service.GetOauth('')).rejects.toThrow();
    });
  });
  describe('CreateOauth', () => {
    it('should createOauth oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateOauth('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateOauth('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createOauth', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateOauth('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createOauth', async () => {
      await expect(service.CreateOauth('')).rejects.toThrow();
    });
  });
  describe('UpdateOauth', () => {
    it('should updateOauth oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateOauth('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateOauth('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateOauth', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateOauth('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateOauth', async () => {
      await expect(service.UpdateOauth('')).rejects.toThrow();
    });
  });
  describe('DeleteOauth', () => {
    it('should deleteOauth oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteOauth('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteOauth('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteOauth', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteOauth('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteOauth', async () => {
      await expect(service.DeleteOauth('')).rejects.toThrow();
    });
  });
  describe('Authorize', () => {
    it('should authorize oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.Authorize('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.Authorize('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during authorize', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.Authorize('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for authorize', async () => {
      await expect(service.Authorize('')).rejects.toThrow();
    });
  });
  describe('GetToken', () => {
    it('should getToken oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetToken('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetToken('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getToken', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetToken('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getToken', async () => {
      await expect(service.GetToken('')).rejects.toThrow();
    });
  });
  describe('RefreshToken', () => {
    it('should refreshToken oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.RefreshToken('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.RefreshToken('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during refreshToken', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.RefreshToken('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for refreshToken', async () => {
      await expect(service.RefreshToken('')).rejects.toThrow();
    });
  });
  describe('RevokeToken', () => {
    it('should revokeToken oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.RevokeToken('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.RevokeToken('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during revokeToken', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.RevokeToken('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for revokeToken', async () => {
      await expect(service.RevokeToken('')).rejects.toThrow();
    });
  });
  describe('GetOauthProviders', () => {
    it('should getOauthProviders oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetOauthProviders('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetOauthProviders('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getOauthProviders', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetOauthProviders('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getOauthProviders', async () => {
      await expect(service.GetOauthProviders('')).rejects.toThrow();
    });
  });
  describe('GetOauthStats', () => {
    it('should getOauthStats oauth successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetOauthStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when oauth not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetOauthStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getOauthStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetOauthStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getOauthStats', async () => {
      await expect(service.GetOauthStats('')).rejects.toThrow();
    });
  });

});
