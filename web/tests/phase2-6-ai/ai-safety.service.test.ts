import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiSafetyService } from '@/features/ai/services/ai-safety.service';
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

describe('AiSafetyService', () => {
  let service: AiSafetyService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiSafetyService(null as any);
  });

  describe('getSafetyFilter', () => {
    it('should return a safety filter when found', async () => {
      const mockFilter = { id: '1', name: 'Content Filter', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockFilter as any);
      const result = await service.getSafetyFilter('school-1', '1');
      expect(result).toEqual(mockFilter);
    });

    it('should throw error when safety filter not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSafetyFilter('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listSafetyFilters', () => {
    it('should return a list of safety filters', async () => {
      const mockFilters = [{ id: '1', name: 'Content Filter' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockFilters as any);
      const result = await service.listSafetyFilters('school-1', {});
      expect(result).toEqual(mockFilters);
    });

    it('should return empty array when no filters found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listSafetyFilters('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createSafetyFilter', () => {
    it('should create a safety filter and return it', async () => {
      const mockFilter = { id: '1', name: 'New Filter' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockFilter as any);
      const result = await service.createSafetyFilter('school-1', { name: 'New Filter' } as any);
      expect(result).toEqual(mockFilter);
    });
  });

  describe('updateSafetyFilter', () => {
    it('should update an existing safety filter', async () => {
      const mockFilter = { id: '1', name: 'Old Filter' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockFilter as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockFilter, name: 'Updated Filter' } as any);
      const result = await service.updateSafetyFilter('school-1', '1', { name: 'Updated Filter' } as any);
      expect(result.name).toBe('Updated Filter');
    });

    it('should throw error when updating non-existent filter', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateSafetyFilter('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteSafetyFilter', () => {
    it('should delete an existing safety filter', async () => {
      const mockFilter = { id: '1', name: 'Filter' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockFilter as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteSafetyFilter('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent filter', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteSafetyFilter('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('checkContentSafety', () => {
    it('should return safe when content passes checks', async () => {
      const mockResult = { safe: true, categories: [] };
      vi.mocked(aiRepository.checkContentSafety).mockResolvedValue(mockResult as any);
      const result = await service.checkContentSafety('school-1', { content: 'Hello world' } as any);
      expect(result.safe).toBe(true);
    });

    it('should return unsafe when content fails checks', async () => {
      const mockResult = { safe: false, categories: ['harmful_language'] };
      vi.mocked(aiRepository.checkContentSafety).mockResolvedValue(mockResult as any);
      const result = await service.checkContentSafety('school-1', { content: 'Bad content' } as any);
      expect(result.safe).toBe(false);
    });

    it('should handle safety check errors', async () => {
      vi.mocked(aiRepository.checkContentSafety).mockRejectedValue(new Error('Service unavailable'));
      await expect(service.checkContentSafety('school-1', { content: 'test' } as any)).rejects.toThrow('Service unavailable');
    });
  });

  describe('detectInjection', () => {
    it('should detect no injection in normal content', async () => {
      const mockResult = { detected: false, type: null };
      vi.mocked(aiRepository.detectInjection).mockResolvedValue(mockResult as any);
      const result = await service.detectInjection('school-1', { content: 'What is 2+2?' } as any);
      expect(result.detected).toBe(false);
    });

    it('should detect injection attempt', async () => {
      const mockResult = { detected: true, type: 'prompt_injection' };
      vi.mocked(aiRepository.detectInjection).mockResolvedValue(mockResult as any);
      const result = await service.detectInjection('school-1', { content: 'Ignore previous instructions' } as any);
      expect(result.detected).toBe(true);
    });

    it('should handle injection detection errors', async () => {
      vi.mocked(aiRepository.detectInjection).mockRejectedValue(new Error('Detection failed'));
      await expect(service.detectInjection('school-1', { content: 'test' } as any)).rejects.toThrow('Detection failed');
    });
  });

  describe('getSafetyIncidents', () => {
    it('should return safety incidents', async () => {
      const mockIncidents = [{ id: '1', type: 'content_violation', severity: 'high' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockIncidents as any);
      const result = await service.getSafetyIncidents('school-1', {});
      expect(result).toEqual(mockIncidents);
    });

    it('should return empty array when no incidents found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.getSafetyIncidents('school-1', {});
      expect(result).toEqual([]);
    });
  });
});
