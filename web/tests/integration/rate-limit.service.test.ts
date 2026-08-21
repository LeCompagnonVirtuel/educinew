import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRateLimitService } from '../../src/features/integration/services/rate-limit.service';

describe('RateLimitService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getRateLimits: vi.fn(),
      getRateLimitById: vi.fn(),
      createRateLimit: vi.fn(),
      updateRateLimit: vi.fn(),
      deleteRateLimit: vi.fn(),
      checkRateLimit: vi.fn(),
      getRateLimitUsage: vi.fn(),
      resetRateLimit: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createRateLimitService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getRateLimits).toBeInstanceOf(Function);
    expect(service.getRateLimitById).toBeInstanceOf(Function);
    expect(service.createRateLimit).toBeInstanceOf(Function);
    expect(service.updateRateLimit).toBeInstanceOf(Function);
    expect(service.deleteRateLimit).toBeInstanceOf(Function);
    expect(service.checkRateLimit).toBeInstanceOf(Function);
    expect(service.getRateLimitUsage).toBeInstanceOf(Function);
    expect(service.resetRateLimit).toBeInstanceOf(Function);
  });

  describe('getRateLimits', () => {
    it('should return rate limits list', async () => {
      mockRepository.getRateLimits.mockResolvedValue([{ id: 'rl-1', name: 'API Rate Limit', limit: 100 }]);
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimits('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return rate limits with filters', async () => {
      mockRepository.getRateLimits.mockResolvedValue([{ id: 'rl-1' }]);
      const service = createRateLimitService(mockRepository);
      await service.getRateLimits('school-1', { status: 'active' });
      expect(mockRepository.getRateLimits).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimits('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getRateLimits.mockResolvedValue([]);
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimits('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated rate limits', async () => {
      mockRepository.getRateLimits.mockResolvedValue({ data: [{ id: 'rl-1' }], total: 10 });
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimits('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getRateLimits.mockResolvedValue([{ id: 'rl-1', type: 'api' }]);
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimits('school-1', { type: 'api' });
      expect(result).toHaveLength(1);
    });

    it('should return rate limits with current usage', async () => {
      mockRepository.getRateLimits.mockResolvedValue([{ id: 'rl-1', currentUsage: 50, limit: 100 }]);
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimits('school-1');
      expect(result[0].currentUsage).toBe(50);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRateLimits.mockRejectedValue(new Error('DB error'));
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimits('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getRateLimitById', () => {
    it('should return a single rate limit', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1', name: 'API Rate Limit', limit: 100 });
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimitById('rl-1');
      expect(result.id).toBe('rl-1');
    });

    it('should throw if rate limit not found', async () => {
      mockRepository.getRateLimitById.mockResolvedValue(null);
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimitById('nonexistent')).rejects.toThrow('Rate limit not found');
    });

    it('should throw if id is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimitById('')).rejects.toThrow('Rate limit ID is required');
    });

    it('should return rate limit with config', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1', config: { windowMs: 60000, maxRequests: 100 } });
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimitById('rl-1');
      expect(result.config.windowMs).toBe(60000);
    });

    it('should return rate limit with exceptions', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1', exceptions: [{ userId: 'user-1', exempt: true }] });
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimitById('rl-1');
      expect(result.exceptions).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRateLimitById.mockRejectedValue(new Error('Query timeout'));
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimitById('rl-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createRateLimit', () => {
    it('should create a rate limit', async () => {
      mockRepository.createRateLimit.mockResolvedValue({ id: 'rl-1', name: 'API Rate Limit', limit: 100 });
      const service = createRateLimitService(mockRepository);
      const result = await service.createRateLimit('school-1', 'user-1', { name: 'API Rate Limit', limit: 100, windowMs: 60000 });
      expect(result.id).toBe('rl-1');
      expect(mockRepository.createRateLimit).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.createRateLimit('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.createRateLimit('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.createRateLimit('school-1', 'user-1', { name: '' })).rejects.toThrow('Rate limit name is required');
    });

    it('should create rate limit with config', async () => {
      mockRepository.createRateLimit.mockResolvedValue({ id: 'rl-1', config: { windowMs: 60000, maxRequests: 100 } });
      const service = createRateLimitService(mockRepository);
      const result = await service.createRateLimit('school-1', 'user-1', { name: 'T', config: { windowMs: 60000, maxRequests: 100 } });
      expect(result.config.windowMs).toBe(60000);
    });

    it('should create rate limit with exceptions', async () => {
      mockRepository.createRateLimit.mockResolvedValue({ id: 'rl-1', exceptions: [{ userId: 'user-1', exempt: true }] });
      const service = createRateLimitService(mockRepository);
      const result = await service.createRateLimit('school-1', 'user-1', { name: 'T', exceptions: [{ userId: 'user-1', exempt: true }] });
      expect(result.exceptions).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createRateLimit.mockRejectedValue(new Error('Invalid config'));
      const service = createRateLimitService(mockRepository);
      await expect(service.createRateLimit('school-1', 'user-1', { name: 'T' })).rejects.toThrow('Invalid config');
    });
  });

  describe('updateRateLimit', () => {
    it('should update a rate limit', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1', name: 'Old' });
      mockRepository.updateRateLimit.mockResolvedValue({ id: 'rl-1', name: 'Updated' });
      const service = createRateLimitService(mockRepository);
      const result = await service.updateRateLimit('rl-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if rate limit not found', async () => {
      mockRepository.getRateLimitById.mockResolvedValue(null);
      const service = createRateLimitService(mockRepository);
      await expect(service.updateRateLimit('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.updateRateLimit('', 'user-1', { name: 'New' })).rejects.toThrow('Rate limit ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.updateRateLimit('rl-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update rate limit config', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1' });
      mockRepository.updateRateLimit.mockResolvedValue({ id: 'rl-1', config: { maxRequests: 200 } });
      const service = createRateLimitService(mockRepository);
      const result = await service.updateRateLimit('rl-1', 'user-1', { config: { maxRequests: 200 } });
      expect(result.config.maxRequests).toBe(200);
    });

    it('should handle update failure', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1' });
      mockRepository.updateRateLimit.mockRejectedValue(new Error('Cannot update'));
      const service = createRateLimitService(mockRepository);
      await expect(service.updateRateLimit('rl-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteRateLimit', () => {
    it('should delete a rate limit', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1' });
      mockRepository.deleteRateLimit.mockResolvedValue({ success: true });
      const service = createRateLimitService(mockRepository);
      await service.deleteRateLimit('rl-1', 'user-1');
      expect(mockRepository.deleteRateLimit).toHaveBeenCalledWith('rl-1');
    });

    it('should throw if rate limit not found', async () => {
      mockRepository.getRateLimitById.mockResolvedValue(null);
      const service = createRateLimitService(mockRepository);
      await expect(service.deleteRateLimit('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.deleteRateLimit('', 'user-1')).rejects.toThrow('Rate limit ID is required');
    });

    it('should handle deletion with active usage', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1' });
      mockRepository.deleteRateLimit.mockRejectedValue(new Error('Rate limit has active usage'));
      const service = createRateLimitService(mockRepository);
      await expect(service.deleteRateLimit('rl-1', 'user-1')).rejects.toThrow('Rate limit has active usage');
    });

    it('should force delete rate limit', async () => {
      mockRepository.getRateLimitById.mockResolvedValue({ id: 'rl-1' });
      mockRepository.deleteRateLimit.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createRateLimitService(mockRepository);
      const result = await service.deleteRateLimit('rl-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('checkRateLimit', () => {
    it('should check rate limit status', async () => {
      mockRepository.checkRateLimit.mockResolvedValue({ allowed: true, remaining: 50, resetAt: '2024-01-01T01:00:00Z' });
      const service = createRateLimitService(mockRepository);
      const result = await service.checkRateLimit('rl-1', 'user-1');
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(50);
    });

    it('should throw if rateLimitId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.checkRateLimit('', 'user-1')).rejects.toThrow('Rate limit ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.checkRateLimit('rl-1', '')).rejects.toThrow('userId is required');
    });

    it('should return denied when limit exceeded', async () => {
      mockRepository.checkRateLimit.mockResolvedValue({ allowed: false, remaining: 0, resetAt: '2024-01-01T01:00:00Z' });
      const service = createRateLimitService(mockRepository);
      const result = await service.checkRateLimit('rl-1', 'user-1');
      expect(result.allowed).toBe(false);
    });

    it('should return rate limit details', async () => {
      mockRepository.checkRateLimit.mockResolvedValue({ allowed: true, remaining: 75, total: 100, windowMs: 60000 });
      const service = createRateLimitService(mockRepository);
      const result = await service.checkRateLimit('rl-1', 'user-1');
      expect(result.total).toBe(100);
    });

    it('should handle repository errors', async () => {
      mockRepository.checkRateLimit.mockRejectedValue(new Error('DB error'));
      const service = createRateLimitService(mockRepository);
      await expect(service.checkRateLimit('rl-1', 'user-1')).rejects.toThrow('DB error');
    });
  });

  describe('getRateLimitUsage', () => {
    it('should return rate limit usage', async () => {
      mockRepository.getRateLimitUsage.mockResolvedValue({ rateLimitId: 'rl-1', totalRequests: 1000, averagePerMinute: 10 });
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimitUsage('rl-1');
      expect(result.totalRequests).toBe(1000);
    });

    it('should return usage with filters', async () => {
      mockRepository.getRateLimitUsage.mockResolvedValue({ rateLimitId: 'rl-1', requests: [] });
      const service = createRateLimitService(mockRepository);
      await service.getRateLimitUsage('rl-1', { since: '2024-01-01' });
      expect(mockRepository.getRateLimitUsage).toHaveBeenCalledWith('rl-1', { since: '2024-01-01' });
    });

    it('should throw if rateLimitId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimitUsage('')).rejects.toThrow('Rate limit ID is required');
    });

    it('should return empty usage', async () => {
      mockRepository.getRateLimitUsage.mockResolvedValue({ rateLimitId: 'rl-1', totalRequests: 0 });
      const service = createRateLimitService(mockRepository);
      const result = await service.getRateLimitUsage('rl-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getRateLimitUsage.mockRejectedValue(new Error('DB error'));
      const service = createRateLimitService(mockRepository);
      await expect(service.getRateLimitUsage('rl-1')).rejects.toThrow('DB error');
    });
  });

  describe('resetRateLimit', () => {
    it('should reset rate limit usage', async () => {
      mockRepository.resetRateLimit.mockResolvedValue({ rateLimitId: 'rl-1', resetAt: '2024-01-01T00:00:00Z' });
      const service = createRateLimitService(mockRepository);
      const result = await service.resetRateLimit('rl-1', 'user-1');
      expect(result.rateLimitId).toBe('rl-1');
    });

    it('should throw if rateLimitId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.resetRateLimit('', 'user-1')).rejects.toThrow('Rate limit ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createRateLimitService(mockRepository);
      await expect(service.resetRateLimit('rl-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle reset failure', async () => {
      mockRepository.resetRateLimit.mockRejectedValue(new Error('Cannot reset'));
      const service = createRateLimitService(mockRepository);
      await expect(service.resetRateLimit('rl-1', 'user-1')).rejects.toThrow('Cannot reset');
    });

    it('should return reset details', async () => {
      mockRepository.resetRateLimit.mockResolvedValue({ rateLimitId: 'rl-1', resetAt: '2024-01-01T00:00:00Z', previousUsage: 50 });
      const service = createRateLimitService(mockRepository);
      const result = await service.resetRateLimit('rl-1', 'user-1');
      expect(result.previousUsage).toBe(50);
    });
  });
});
