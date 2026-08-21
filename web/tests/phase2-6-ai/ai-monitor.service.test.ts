import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiMonitorService } from '@/features/ai/services/ai-monitor.service';
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

describe('AiMonitorService', () => {
  let service: AiMonitorService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiMonitorService(null as any);
  });

  describe('getMonitor', () => {
    it('should return a monitor config when found', async () => {
      const mockMonitor = { id: '1', name: 'API Latency', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockMonitor as any);
      const result = await service.getMonitor('school-1', '1');
      expect(result).toEqual(mockMonitor);
    });

    it('should throw error when monitor not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getMonitor('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listMonitors', () => {
    it('should return a list of monitors', async () => {
      const mockMonitors = [{ id: '1', name: 'Latency' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockMonitors as any);
      const result = await service.listMonitors('school-1', {});
      expect(result).toEqual(mockMonitors);
    });

    it('should return empty array when no monitors found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listMonitors('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createMonitor', () => {
    it('should create a monitor and return it', async () => {
      const mockMonitor = { id: '1', name: 'New Monitor' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockMonitor as any);
      const result = await service.createMonitor('school-1', { name: 'New Monitor' } as any);
      expect(result).toEqual(mockMonitor);
    });
  });

  describe('updateMonitor', () => {
    it('should update an existing monitor', async () => {
      const mockMonitor = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockMonitor as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockMonitor, name: 'Updated Name' } as any);
      const result = await service.updateMonitor('school-1', '1', { name: 'Updated Name' } as any);
      expect(result.name).toBe('Updated Name');
    });

    it('should throw error when updating non-existent monitor', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateMonitor('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteMonitor', () => {
    it('should delete an existing monitor', async () => {
      const mockMonitor = { id: '1', name: 'Monitor' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockMonitor as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteMonitor('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent monitor', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteMonitor('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getMonitorStatus', () => {
    it('should return the current monitor status', async () => {
      const mockStatus = { status: 'healthy', uptime: 99.97 };
      vi.mocked(aiRepository.getMonitorStatus).mockResolvedValue(mockStatus as any);
      const result = await service.getMonitorStatus('school-1');
      expect(result).toEqual(mockStatus);
    });

    it('should handle status retrieval errors', async () => {
      vi.mocked(aiRepository.getMonitorStatus).mockRejectedValue(new Error('Status unavailable'));
      await expect(service.getMonitorStatus('school-1')).rejects.toThrow('Status unavailable');
    });
  });
});
