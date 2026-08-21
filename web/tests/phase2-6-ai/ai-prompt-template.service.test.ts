import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiPromptTemplateService } from '@/features/ai/services/ai-prompt-template.service';
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

describe('AiPromptTemplateService', () => {
  let service: AiPromptTemplateService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiPromptTemplateService(null as any);
  });

  describe('getTemplate', () => {
    it('should return a template when found', async () => {
      const mockTemplate = { id: '1', name: 'Summarizer', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockTemplate as any);
      const result = await service.getTemplate('school-1', '1');
      expect(result).toEqual(mockTemplate);
    });

    it('should throw error when template not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getTemplate('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listTemplates', () => {
    it('should return a list of templates', async () => {
      const mockTemplates = [{ id: '1', name: 'Summarizer' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockTemplates as any);
      const result = await service.listTemplates('school-1', {});
      expect(result).toEqual(mockTemplates);
    });

    it('should return empty array when no templates found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listTemplates('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createTemplate', () => {
    it('should create a template and return it', async () => {
      const mockTemplate = { id: '1', name: 'Summarizer' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockTemplate as any);
      const result = await service.createTemplate('school-1', { name: 'Summarizer' } as any);
      expect(result).toEqual(mockTemplate);
    });
  });

  describe('updateTemplate', () => {
    it('should update an existing template', async () => {
      const mockTemplate = { id: '1', name: 'Summarizer' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockTemplate as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockTemplate, name: 'Summarizer Pro' } as any);
      const result = await service.updateTemplate('school-1', '1', { name: 'Summarizer Pro' } as any);
      expect(result.name).toBe('Summarizer Pro');
    });

    it('should throw error when updating non-existent template', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateTemplate('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteTemplate', () => {
    it('should delete an existing template', async () => {
      const mockTemplate = { id: '1', name: 'Summarizer' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockTemplate as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteTemplate('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent template', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteTemplate('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
