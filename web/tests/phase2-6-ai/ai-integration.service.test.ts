import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiIntegrationService } from '@/features/ai/services/ai-integration.service';
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

describe('AiIntegrationService', () => {
  let service: AiIntegrationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiIntegrationService(null as any);
  });

  describe('getIntegration', () => {
    it('should return an integration when found', async () => {
      const mockIntegration = { id: '1', name: 'Google Classroom', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockIntegration as any);
      const result = await service.getIntegration('school-1', '1');
      expect(result).toEqual(mockIntegration);
    });

    it('should throw error when integration not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getIntegration('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listIntegrations', () => {
    it('should return a list of integrations', async () => {
      const mockIntegrations = [{ id: '1', name: 'Google Classroom' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockIntegrations as any);
      const result = await service.listIntegrations('school-1', {});
      expect(result).toEqual(mockIntegrations);
    });

    it('should return empty array when no integrations found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listIntegrations('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createIntegration', () => {
    it('should create an integration and return it', async () => {
      const mockIntegration = { id: '1', name: 'New Integration' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockIntegration as any);
      const result = await service.createIntegration('school-1', { name: 'New Integration' } as any);
      expect(result).toEqual(mockIntegration);
    });
  });

  describe('updateIntegration', () => {
    it('should update an existing integration', async () => {
      const mockIntegration = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockIntegration as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockIntegration, name: 'Updated' } as any);
      const result = await service.updateIntegration('school-1', '1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
    });

    it('should throw error when updating non-existent integration', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateIntegration('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteIntegration', () => {
    it('should delete an existing integration', async () => {
      const mockIntegration = { id: '1', name: 'Integration' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockIntegration as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteIntegration('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent integration', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteIntegration('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
