import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiEthicsService } from '@/features/ai/services/ai-ethics.service';
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

describe('AiEthicsService', () => {
  let service: AiEthicsService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiEthicsService(null as any);
  });

  describe('getEthicsPolicy', () => {
    it('should return an ethics policy when found', async () => {
      const mockPolicy = { id: '1', name: 'Fairness Policy', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      const result = await service.getEthicsPolicy('school-1', '1');
      expect(result).toEqual(mockPolicy);
    });

    it('should throw error when ethics policy not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getEthicsPolicy('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listEthicsPolicies', () => {
    it('should return a list of ethics policies', async () => {
      const mockPolicies = [{ id: '1', name: 'Fairness Policy' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockPolicies as any);
      const result = await service.listEthicsPolicies('school-1', {});
      expect(result).toEqual(mockPolicies);
    });

    it('should return empty array when no policies found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listEthicsPolicies('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createEthicsPolicy', () => {
    it('should create an ethics policy and return it', async () => {
      const mockPolicy = { id: '1', name: 'New Policy' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockPolicy as any);
      const result = await service.createEthicsPolicy('school-1', { name: 'New Policy' } as any);
      expect(result).toEqual(mockPolicy);
    });
  });

  describe('updateEthicsPolicy', () => {
    it('should update an existing ethics policy', async () => {
      const mockPolicy = { id: '1', name: 'Old Policy' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockPolicy, name: 'Updated Policy' } as any);
      const result = await service.updateEthicsPolicy('school-1', '1', { name: 'Updated Policy' } as any);
      expect(result.name).toBe('Updated Policy');
    });

    it('should throw error when updating non-existent policy', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateEthicsPolicy('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteEthicsPolicy', () => {
    it('should delete an existing ethics policy', async () => {
      const mockPolicy = { id: '1', name: 'Policy' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteEthicsPolicy('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent policy', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteEthicsPolicy('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
