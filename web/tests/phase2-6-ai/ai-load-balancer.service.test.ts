import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiLoadBalancerService } from '@/features/ai/services/ai-load-balancer.service';
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

describe('AiLoadBalancerService', () => {
  let service: AiLoadBalancerService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiLoadBalancerService(null as any);
  });

  describe('getLoadBalancer', () => {
    it('should return a load balancer config when found', async () => {
      const mockLB = { id: '1', strategy: 'round-robin', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockLB as any);
      const result = await service.getLoadBalancer('school-1', '1');
      expect(result).toEqual(mockLB);
    });

    it('should throw error when load balancer not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getLoadBalancer('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listLoadBalancers', () => {
    it('should return a list of load balancers', async () => {
      const mockLBs = [{ id: '1', strategy: 'round-robin' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockLBs as any);
      const result = await service.listLoadBalancers('school-1', {});
      expect(result).toEqual(mockLBs);
    });

    it('should return empty array when no load balancers found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listLoadBalancers('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createLoadBalancer', () => {
    it('should create a load balancer and return it', async () => {
      const mockLB = { id: '1', strategy: 'least-connections' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockLB as any);
      const result = await service.createLoadBalancer('school-1', { strategy: 'least-connections' } as any);
      expect(result).toEqual(mockLB);
    });
  });

  describe('updateLoadBalancer', () => {
    it('should update an existing load balancer', async () => {
      const mockLB = { id: '1', strategy: 'round-robin' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockLB as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockLB, strategy: 'weighted' } as any);
      const result = await service.updateLoadBalancer('school-1', '1', { strategy: 'weighted' } as any);
      expect(result.strategy).toBe('weighted');
    });

    it('should throw error when updating non-existent load balancer', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateLoadBalancer('school-1', 'nonexistent', { strategy: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteLoadBalancer', () => {
    it('should delete an existing load balancer', async () => {
      const mockLB = { id: '1', strategy: 'round-robin' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockLB as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteLoadBalancer('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent load balancer', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteLoadBalancer('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
