import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAdminAssistantService } from '@/features/ai/services/ai-admin-assistant.service';
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

describe('AiAdminAssistantService', () => {
  let service: AiAdminAssistantService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAdminAssistantService(null as any);
  });

  describe('getAssistant', () => {
    it('should return an assistant when found', async () => {
      const mockAssistant = { id: '1', name: 'Admin Assistant', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const result = await service.getAssistant('school-1', '1');
      expect(result).toEqual(mockAssistant);
    });

    it('should throw error when assistant not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAssistant('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAssistants', () => {
    it('should return a list of assistants', async () => {
      const mockAssistants = [{ id: '1', name: 'Admin Assistant' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAssistants as any);
      const result = await service.listAssistants('school-1', {});
      expect(result).toEqual(mockAssistants);
    });

    it('should return empty array when no assistants found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAssistants('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAssistant', () => {
    it('should create an assistant and return it', async () => {
      const mockAssistant = { id: '1', name: 'New Admin Assistant' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAssistant as any);
      const result = await service.createAssistant('school-1', { name: 'New Admin Assistant' } as any);
      expect(result).toEqual(mockAssistant);
    });
  });

  describe('updateAssistant', () => {
    it('should update an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Old Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAssistant, name: 'Updated' } as any);
      const result = await service.updateAssistant('school-1', '1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
    });

    it('should throw error when updating non-existent assistant', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAssistant('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAssistant', () => {
    it('should delete an existing assistant', async () => {
      const mockAssistant = { id: '1', name: 'Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAssistant('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent assistant', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAssistant('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getSchoolInsights', () => {
    it('should return school insights', async () => {
      const mockAssistant = { id: '1', name: 'Admin Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockInsights = [{ id: '1', metric: 'enrollment' }];
      vi.mocked(aiRepository.findInsightsByAssistantId).mockResolvedValue(mockInsights as any);
      const result = await service.getSchoolInsights('school-1', '1');
      expect(result).toEqual(mockInsights);
    });

    it('should throw error when assistant not found for insights', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSchoolInsights('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getBudgetForecasts', () => {
    it('should return budget forecasts', async () => {
      const mockAssistant = { id: '1', name: 'Admin Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockForecasts = [{ id: '1', year: 2025 }];
      vi.mocked(aiRepository.findForecastsByAssistantId).mockResolvedValue(mockForecasts as any);
      const result = await service.getBudgetForecasts('school-1', '1');
      expect(result).toEqual(mockForecasts);
    });

    it('should throw error when assistant not found for forecasts', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getBudgetForecasts('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('generateReport', () => {
    it('should generate a report for a given period', async () => {
      const mockAssistant = { id: '1', name: 'Admin Assistant' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAssistant as any);
      const mockReport = { id: '1', title: 'Monthly Report' };
      vi.mocked(aiRepository.generateReportByAssistantId).mockResolvedValue(mockReport as any);
      const result = await service.generateReport('school-1', '1', '2025-01');
      expect(result).toEqual(mockReport);
    });

    it('should throw error when assistant not found for report generation', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.generateReport('school-1', 'nonexistent', '2025-01')).rejects.toThrow();
    });
  });
});
