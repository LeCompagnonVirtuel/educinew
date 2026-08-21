import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiAlertService } from '@/features/ai/services/ai-alert.service';
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

describe('AiAlertService', () => {
  let service: AiAlertService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiAlertService(null as any);
  });

  describe('getAlert', () => {
    it('should return an alert when found', async () => {
      const mockAlert = { id: '1', severity: 'high', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAlert as any);
      const result = await service.getAlert('school-1', '1');
      expect(result).toEqual(mockAlert);
    });

    it('should throw error when alert not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getAlert('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listAlerts', () => {
    it('should return a list of alerts', async () => {
      const mockAlerts = [{ id: '1', severity: 'high' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAlerts as any);
      const result = await service.listAlerts('school-1', {});
      expect(result).toEqual(mockAlerts);
    });

    it('should return empty array when no alerts found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listAlerts('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createAlert', () => {
    it('should create an alert and return it', async () => {
      const mockAlert = { id: '1', severity: 'medium' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAlert as any);
      const result = await service.createAlert('school-1', { severity: 'medium' } as any);
      expect(result).toEqual(mockAlert);
    });
  });

  describe('updateAlert', () => {
    it('should update an existing alert', async () => {
      const mockAlert = { id: '1', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAlert as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAlert, status: 'resolved' } as any);
      const result = await service.updateAlert('school-1', '1', { status: 'resolved' } as any);
      expect(result.status).toBe('resolved');
    });

    it('should throw error when updating non-existent alert', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateAlert('school-1', 'nonexistent', { status: 'resolved' } as any)).rejects.toThrow();
    });
  });

  describe('deleteAlert', () => {
    it('should delete an existing alert', async () => {
      const mockAlert = { id: '1', severity: 'high' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAlert as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteAlert('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent alert', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteAlert('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getActiveAlerts', () => {
    it('should return active alerts', async () => {
      const mockAlerts = [{ id: '1', status: 'active' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAlerts as any);
      const result = await service.getActiveAlerts('school-1');
      expect(result).toEqual(mockAlerts);
    });

    it('should return empty array when no active alerts', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.getActiveAlerts('school-1');
      expect(result).toEqual([]);
    });
  });

  describe('resolveAlert', () => {
    it('should resolve an active alert', async () => {
      const mockAlert = { id: '1', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAlert as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAlert, status: 'resolved' } as any);
      const result = await service.resolveAlert('school-1', '1');
      expect(result.status).toBe('resolved');
    });

    it('should throw error when resolving non-existent alert', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.resolveAlert('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getAlertStats', () => {
    it('should return alert statistics', async () => {
      const mockStats = { total: 25, active: 3, resolved: 22 };
      vi.mocked(aiRepository.getAlertStats).mockResolvedValue(mockStats as any);
      const result = await service.getAlertStats('school-1');
      expect(result).toEqual(mockStats);
    });

    it('should handle stats retrieval errors', async () => {
      vi.mocked(aiRepository.getAlertStats).mockRejectedValue(new Error('Stats unavailable'));
      await expect(service.getAlertStats('school-1')).rejects.toThrow('Stats unavailable');
    });
  });
});
