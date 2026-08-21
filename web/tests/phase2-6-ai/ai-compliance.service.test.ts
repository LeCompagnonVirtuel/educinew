import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiComplianceService } from '@/features/ai/services/ai-compliance.service';
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

describe('AiComplianceService', () => {
  let service: AiComplianceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiComplianceService(null as any);
  });

  describe('getComplianceCheck', () => {
    it('should return a compliance check when found', async () => {
      const mockCheck = { id: '1', framework: 'GDPR', status: 'passed', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      const result = await service.getComplianceCheck('school-1', '1');
      expect(result).toEqual(mockCheck);
    });

    it('should throw error when compliance check not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getComplianceCheck('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listComplianceChecks', () => {
    it('should return a list of compliance checks', async () => {
      const mockChecks = [{ id: '1', framework: 'GDPR' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockChecks as any);
      const result = await service.listComplianceChecks('school-1', {});
      expect(result).toEqual(mockChecks);
    });

    it('should return empty array when no compliance checks found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listComplianceChecks('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createComplianceCheck', () => {
    it('should create a compliance check and return it', async () => {
      const mockCheck = { id: '1', framework: 'COPPA' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockCheck as any);
      const result = await service.createComplianceCheck('school-1', { framework: 'COPPA' } as any);
      expect(result).toEqual(mockCheck);
    });
  });

  describe('updateComplianceCheck', () => {
    it('should update an existing compliance check', async () => {
      const mockCheck = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockCheck, status: 'passed' } as any);
      const result = await service.updateComplianceCheck('school-1', '1', { status: 'passed' } as any);
      expect(result.status).toBe('passed');
    });

    it('should throw error when updating non-existent compliance check', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateComplianceCheck('school-1', 'nonexistent', { status: 'passed' } as any)).rejects.toThrow();
    });
  });

  describe('deleteComplianceCheck', () => {
    it('should delete an existing compliance check', async () => {
      const mockCheck = { id: '1', framework: 'GDPR' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteComplianceCheck('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent compliance check', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteComplianceCheck('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('runComplianceAudit', () => {
    it('should run a compliance audit and return results', async () => {
      const mockResult = { passed: 18, failed: 2, warnings: 5, score: 0.9 };
      vi.mocked(aiRepository.runComplianceAudit).mockResolvedValue(mockResult as any);
      const result = await service.runComplianceAudit('school-1', { framework: 'GDPR' } as any);
      expect(result.passed).toBe(18);
    });

    it('should handle compliance audit errors', async () => {
      vi.mocked(aiRepository.runComplianceAudit).mockRejectedValue(new Error('Audit failed'));
      await expect(service.runComplianceAudit('school-1', { framework: 'GDPR' } as any)).rejects.toThrow('Audit failed');
    });
  });
});
