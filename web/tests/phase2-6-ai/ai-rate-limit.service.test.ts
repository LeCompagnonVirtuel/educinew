import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiRateLimitService } from '@/features/ai/services/ai-rate-limit.service';
import { aiRepository } from '../repositories/ai.repository';

vi.mock('@/features/repositories/ai.repository', () => ({
  aiRepository: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AiRateLimitService', () => {
  let service: AiRateLimitService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiRateLimitService(null as any);
  });

  describe('getRateLimit', () => {
    it('should return a rate limit config when found', async () => {
      const mockRateLimit = { id: '1', maxRequests: 100, schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockRateLimit as any);
      const result = await service.getRateLimit('school-1', '1');
      expect(result).toEqual(mockRateLimit);
    });

    it('should throw error when rate limit not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getRateLimit('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listRateLimits', () => {
    it('should return a list of rate limits', async () => {
      const mockRateLimits = [{ id: '1', maxRequests: 100 }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockRateLimits as any);
      const result = await service.listRateLimits('school-1', {});
      expect(result).toEqual(mockRateLimits);
    });

    it('should return empty array when no rate limits found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listRateLimits('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createRateLimit', () => {
    it('should create a rate limit and return it', async () => {
      const mockRateLimit = { id: '1', maxRequests: 50 };
      vi.mocked(aiRepository.create).mockResolvedValue(mockRateLimit as any);
      const result = await service.createRateLimit('school-1', { maxRequests: 50 } as any);
      expect(result).toEqual(mockRateLimit);
    });
  });

  describe('updateRateLimit', () => {
    it('should update an existing rate limit', async () => {
      const mockRateLimit = { id: '1', maxRequests: 100 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockRateLimit as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockRateLimit, maxRequests: 200 } as any);
      const result = await service.updateRateLimit('school-1', '1', { maxRequests: 200 } as any);
      expect(result.maxRequests).toBe(200);
    });

    it('should throw error when updating non-existent rate limit', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateRateLimit('school-1', 'nonexistent', { maxRequests: 200 } as any)).rejects.toThrow();
    });
  });

  describe('deleteRateLimit', () => {
    it('should delete an existing rate limit', async () => {
      const mockRateLimit = { id: '1', maxRequests: 100 };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockRateLimit as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteRateLimit('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent rate limit', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteRateLimit('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
