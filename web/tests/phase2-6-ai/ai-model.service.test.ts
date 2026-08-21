import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiModelService } from '@/features/ai/services/ai-model.service';
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

describe('AiModelService', () => {
  let service: AiModelService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiModelService(null as any);
  });

  describe('getModel', () => {
    it('should return a model when found', async () => {
      const mockModel = { id: '1', name: 'GPT-4', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockModel as any);
      const result = await service.getModel('school-1', '1');
      expect(result).toEqual(mockModel);
    });

    it('should throw error when model not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getModel('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listModels', () => {
    it('should return a list of models', async () => {
      const mockModels = [{ id: '1', name: 'GPT-4' }, { id: '2', name: 'Claude' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockModels as any);
      const result = await service.listModels('school-1', { search: 'test' });
      expect(result).toEqual(mockModels);
    });

    it('should return empty array when no models found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listModels('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createModel', () => {
    it('should create a model and return it', async () => {
      const mockModel = { id: '1', name: 'GPT-4', schoolId: 'school-1' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockModel as any);
      const result = await service.createModel('school-1', { name: 'GPT-4' } as any);
      expect(result).toEqual(mockModel);
      expect(aiRepository.create).toHaveBeenCalledWith('school-1', { name: 'GPT-4' });
    });
  });

  describe('updateModel', () => {
    it('should update an existing model', async () => {
      const mockModel = { id: '1', name: 'GPT-4', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockModel as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockModel, name: 'GPT-4 Turbo' } as any);
      const result = await service.updateModel('school-1', '1', { name: 'GPT-4 Turbo' } as any);
      expect(result.name).toBe('GPT-4 Turbo');
    });

    it('should throw error when updating non-existent model', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateModel('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteModel', () => {
    it('should delete an existing model', async () => {
      const mockModel = { id: '1', name: 'GPT-4' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockModel as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteModel('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent model', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteModel('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
