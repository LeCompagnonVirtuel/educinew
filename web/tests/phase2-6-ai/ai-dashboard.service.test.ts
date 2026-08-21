import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiDashboardService } from '@/features/ai/services/ai-dashboard.service';
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

describe('AiDashboardService', () => {
  let service: AiDashboardService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiDashboardService(null as any);
  });

  describe('getDashboard', () => {
    it('should return a dashboard when found', async () => {
      const mockDashboard = { id: '1', name: 'AI Overview', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDashboard as any);
      const result = await service.getDashboard('school-1', '1');
      expect(result).toEqual(mockDashboard);
    });

    it('should throw error when dashboard not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getDashboard('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listDashboards', () => {
    it('should return a list of dashboards', async () => {
      const mockDashboards = [{ id: '1', name: 'Overview' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockDashboards as any);
      const result = await service.listDashboards('school-1', {});
      expect(result).toEqual(mockDashboards);
    });

    it('should return empty array when no dashboards found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listDashboards('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createDashboard', () => {
    it('should create a dashboard and return it', async () => {
      const mockDashboard = { id: '1', name: 'New Dashboard' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockDashboard as any);
      const result = await service.createDashboard('school-1', { name: 'New Dashboard' } as any);
      expect(result).toEqual(mockDashboard);
    });
  });

  describe('updateDashboard', () => {
    it('should update an existing dashboard', async () => {
      const mockDashboard = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDashboard as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockDashboard, name: 'Updated Name' } as any);
      const result = await service.updateDashboard('school-1', '1', { name: 'Updated Name' } as any);
      expect(result.name).toBe('Updated Name');
    });

    it('should throw error when updating non-existent dashboard', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateDashboard('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteDashboard', () => {
    it('should delete an existing dashboard', async () => {
      const mockDashboard = { id: '1', name: 'Dashboard' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDashboard as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteDashboard('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent dashboard', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteDashboard('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
