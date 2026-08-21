import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiScheduleService } from '@/features/ai/services/ai-schedule.service';
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

describe('AiScheduleService', () => {
  let service: AiScheduleService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiScheduleService(null as any);
  });

  describe('getSchedule', () => {
    it('should return a schedule when found', async () => {
      const mockSchedule = { id: '1', name: 'Weekly AI Backup', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSchedule as any);
      const result = await service.getSchedule('school-1', '1');
      expect(result).toEqual(mockSchedule);
    });

    it('should throw error when schedule not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getSchedule('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listSchedules', () => {
    it('should return a list of schedules', async () => {
      const mockSchedules = [{ id: '1', name: 'Backup' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockSchedules as any);
      const result = await service.listSchedules('school-1', {});
      expect(result).toEqual(mockSchedules);
    });

    it('should return empty array when no schedules found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listSchedules('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createSchedule', () => {
    it('should create a schedule and return it', async () => {
      const mockSchedule = { id: '1', name: 'New Schedule' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockSchedule as any);
      const result = await service.createSchedule('school-1', { name: 'New Schedule' } as any);
      expect(result).toEqual(mockSchedule);
    });
  });

  describe('updateSchedule', () => {
    it('should update an existing schedule', async () => {
      const mockSchedule = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSchedule as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockSchedule, name: 'Updated Name' } as any);
      const result = await service.updateSchedule('school-1', '1', { name: 'Updated Name' } as any);
      expect(result.name).toBe('Updated Name');
    });

    it('should throw error when updating non-existent schedule', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateSchedule('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteSchedule', () => {
    it('should delete an existing schedule', async () => {
      const mockSchedule = { id: '1', name: 'Schedule' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSchedule as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteSchedule('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent schedule', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteSchedule('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('getUpcomingScheduledJobs', () => {
    it('should return upcoming scheduled jobs', async () => {
      const mockJobs = [{ id: '1', name: 'Backup', nextRun: '2025-01-15T10:00:00Z' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockJobs as any);
      const result = await service.getUpcomingScheduledJobs('school-1');
      expect(result).toEqual(mockJobs);
    });

    it('should return empty array when no upcoming jobs', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.getUpcomingScheduledJobs('school-1');
      expect(result).toEqual([]);
    });
  });
});
