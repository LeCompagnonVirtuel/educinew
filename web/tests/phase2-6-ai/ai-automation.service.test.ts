import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAutomationService } from '@/features/ai/services/ai-automation.service';
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

describe('AiAutomationService', () => {
  let service: AiAutomationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAutomationService(null as any);
  });

  describe('getAutomation', () => {
    it('should return an automation when found', async () => {
      const mockAutomation = { id: '1', name: 'Auto-Grading', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAutomation as any);
      const result = await service.getAutomation('school-1', '1');
      expect(result).toEqual(mockAutomation);
    });

    it('should throw error when automation not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAutomation('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAutomations', () => {
    it('should return a list of automations', async () => {
      const mockAutomations = [{ id: '1', name: 'Auto-Grading' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAutomations as any);
      const result = await service.listAutomations('school-1', {});
      expect(result).toEqual(mockAutomations);
    });

    it('should return empty array when no automations found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAutomations('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAutomation', () => {
    it('should create an automation and return it', async () => {
      const mockAutomation = { id: '1', name: 'New Automation' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAutomation as any);
      const result = await service.createAutomation('school-1', { name: 'New Automation' } as any);
      expect(result).toEqual(mockAutomation);
    });
  });

  describe('updateAutomation', () => {
    it('should update an existing automation', async () => {
      const mockAutomation = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAutomation as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAutomation, name: 'Updated Name' } as any);
      const result = await service.updateAutomation('school-1', '1', { name: 'Updated Name' } as any);
      expect(result.name).toBe('Updated Name');
    });

    it('should throw error when updating non-existent automation', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAutomation('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAutomation', () => {
    it('should delete an existing automation', async () => {
      const mockAutomation = { id: '1', name: 'Automation' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAutomation as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAutomation('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent automation', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAutomation('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('triggerAutomation', () => {
    it('should trigger an automation successfully', async () => {
      const mockAutomation = { id: '1', name: 'Auto-Grading', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAutomation as any);
      const mockResult = { executionId: 'exec-1', status: 'running' };
      vi.mocked(aiRepository.triggerAutomation).mockResolvedValue(mockResult as any);
      const result = await service.triggerAutomation('school-1', '1', { assignmentId: 'a-1' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should throw error when triggering non-existent automation', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.triggerAutomation('school-1', 'nonexistent', {} as any)).rejects.toThrow();
    });
  });
});
