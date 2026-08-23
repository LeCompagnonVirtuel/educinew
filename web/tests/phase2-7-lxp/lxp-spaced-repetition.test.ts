import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpSpacedRepetitionService } from '@/features/lxp/services/lxp-spaced-repetition.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpSpacedRepetitionService', () => {
  let service: LxpSpacedRepetitionService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpSpacedRepetitionService(mockSupabase as never);
  });

  describe('GetSchedule', () => {
    it('should getSchedule spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetSchedule('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetSchedule('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getSchedule', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetSchedule('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getSchedule', async () => {
      await expect(service.GetSchedule('')).rejects.toThrow();
    });
  });
  describe('CreateSchedule', () => {
    it('should createSchedule spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateSchedule('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateSchedule('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createSchedule', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateSchedule('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createSchedule', async () => {
      await expect(service.CreateSchedule('')).rejects.toThrow();
    });
  });
  describe('UpdateSchedule', () => {
    it('should updateSchedule spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateSchedule('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateSchedule('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateSchedule', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateSchedule('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateSchedule', async () => {
      await expect(service.UpdateSchedule('')).rejects.toThrow();
    });
  });
  describe('DeleteSchedule', () => {
    it('should deleteSchedule spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteSchedule('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteSchedule('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteSchedule', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteSchedule('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteSchedule', async () => {
      await expect(service.DeleteSchedule('')).rejects.toThrow();
    });
  });
  describe('GetDueItems', () => {
    it('should getDueItems spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetDueItems('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetDueItems('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getDueItems', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetDueItems('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getDueItems', async () => {
      await expect(service.GetDueItems('')).rejects.toThrow();
    });
  });
  describe('ReviewItem', () => {
    it('should reviewItem spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ReviewItem('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ReviewItem('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during reviewItem', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ReviewItem('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for reviewItem', async () => {
      await expect(service.ReviewItem('')).rejects.toThrow();
    });
  });
  describe('GetScheduleStats', () => {
    it('should getScheduleStats spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetScheduleStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetScheduleStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getScheduleStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetScheduleStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getScheduleStats', async () => {
      await expect(service.GetScheduleStats('')).rejects.toThrow();
    });
  });
  describe('GetScheduleHistory', () => {
    it('should getScheduleHistory spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetScheduleHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetScheduleHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getScheduleHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetScheduleHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getScheduleHistory', async () => {
      await expect(service.GetScheduleHistory('')).rejects.toThrow();
    });
  });
  describe('AdjustInterval', () => {
    it('should adjustInterval spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.AdjustInterval('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.AdjustInterval('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during adjustInterval', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.AdjustInterval('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for adjustInterval', async () => {
      await expect(service.AdjustInterval('')).rejects.toThrow();
    });
  });
  describe('GetAlgorithm', () => {
    it('should getAlgorithm spaced repetition successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetAlgorithm('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when spaced repetition not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetAlgorithm('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getAlgorithm', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetAlgorithm('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getAlgorithm', async () => {
      await expect(service.GetAlgorithm('')).rejects.toThrow();
    });
  });

});
