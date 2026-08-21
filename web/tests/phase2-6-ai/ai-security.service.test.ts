import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiSecurityService } from '@/features/ai/services/ai-security.service';
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

describe('AiSecurityService', () => {
  let service: AiSecurityService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiSecurityService(null as any);
  });

  describe('getSecurityPolicy', () => {
    it('should return a security policy when found', async () => {
      const mockPolicy = { id: '1', name: 'Data Encryption', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      const result = await service.getSecurityPolicy('school-1', '1');
      expect(result).toEqual(mockPolicy);
    });

    it('should throw error when security policy not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSecurityPolicy('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listSecurityPolicies', () => {
    it('should return a list of security policies', async () => {
      const mockPolicies = [{ id: '1', name: 'Encryption' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockPolicies as any);
      const result = await service.listSecurityPolicies('school-1', {});
      expect(result).toEqual(mockPolicies);
    });

    it('should return empty array when no security policies found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listSecurityPolicies('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createSecurityPolicy', () => {
    it('should create a security policy and return it', async () => {
      const mockPolicy = { id: '1', name: 'New Policy' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockPolicy as any);
      const result = await service.createSecurityPolicy('school-1', { name: 'New Policy' } as any);
      expect(result).toEqual(mockPolicy);
    });
  });

  describe('updateSecurityPolicy', () => {
    it('should update an existing security policy', async () => {
      const mockPolicy = { id: '1', name: 'Old Policy' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockPolicy, name: 'Updated Policy' } as any);
      const result = await service.updateSecurityPolicy('school-1', '1', { name: 'Updated Policy' } as any);
      expect(result.name).toBe('Updated Policy');
    });

    it('should throw error when updating non-existent security policy', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateSecurityPolicy('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteSecurityPolicy', () => {
    it('should delete an existing security policy', async () => {
      const mockPolicy = { id: '1', name: 'Policy' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockPolicy as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteSecurityPolicy('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent security policy', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteSecurityPolicy('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('runSecurityScan', () => {
    it('should run a security scan and return results', async () => {
      const mockResult = { vulnerabilities: 0, warnings: 2, passed: true };
      vi.mocked(aiRepository.runSecurityScan).mockResolvedValue(mockResult as any);
      const result = await service.runSecurityScan('school-1', { target: 'api-endpoints' } as any);
      expect(result.passed).toBe(true);
    });

    it('should handle security scan errors', async () => {
      vi.mocked(aiRepository.runSecurityScan).mockRejectedValue(new Error('Scan failed'));
      await expect(service.runSecurityScan('school-1', { target: 'api' } as any)).rejects.toThrow('Scan failed');
    });
  });
});
