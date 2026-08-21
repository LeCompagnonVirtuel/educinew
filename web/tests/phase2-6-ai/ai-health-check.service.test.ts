import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiHealthCheckService } from '@/features/ai/services/ai-health-check.service';
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

describe('AiHealthCheckService', () => {
  let service: AiHealthCheckService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiHealthCheckService(null as any);
  });

  describe('getHealthCheck', () => {
    it('should return a health check when found', async () => {
      const mockCheck = { id: '1', service: 'ai-model', status: 'healthy', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      const result = await service.getHealthCheck('school-1', '1');
      expect(result).toEqual(mockCheck);
    });

    it('should throw error when health check not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getHealthCheck('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listHealthChecks', () => {
    it('should return a list of health checks', async () => {
      const mockChecks = [{ id: '1', service: 'ai-model' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockChecks as any);
      const result = await service.listHealthChecks('school-1', {});
      expect(result).toEqual(mockChecks);
    });

    it('should return empty array when no health checks found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listHealthChecks('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createHealthCheck', () => {
    it('should create a health check and return it', async () => {
      const mockCheck = { id: '1', service: 'new-service' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockCheck as any);
      const result = await service.createHealthCheck('school-1', { service: 'new-service' } as any);
      expect(result).toEqual(mockCheck);
    });
  });

  describe('deleteHealthCheck', () => {
    it('should delete an existing health check', async () => {
      const mockCheck = { id: '1', service: 'test' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockCheck as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteHealthCheck('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent health check', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteHealthCheck('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
