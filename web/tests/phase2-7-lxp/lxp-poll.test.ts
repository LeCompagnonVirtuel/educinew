import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpPollService } from '@/features/lxp/services/lxp-poll.service';

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

describe('LxpPollService', () => {
  let service: LxpPollService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpPollService(mockSupabase as never);
  });

  describe('GetPoll', () => {
    it('should getPoll poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPoll('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPoll('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPoll', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPoll('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPoll', async () => {
      await expect(service.GetPoll('')).rejects.toThrow();
    });
  });
  describe('CreatePoll', () => {
    it('should createPoll poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreatePoll('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreatePoll('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createPoll', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreatePoll('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createPoll', async () => {
      await expect(service.CreatePoll('')).rejects.toThrow();
    });
  });
  describe('UpdatePoll', () => {
    it('should updatePoll poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdatePoll('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdatePoll('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updatePoll', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdatePoll('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updatePoll', async () => {
      await expect(service.UpdatePoll('')).rejects.toThrow();
    });
  });
  describe('DeletePoll', () => {
    it('should deletePoll poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeletePoll('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeletePoll('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deletePoll', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeletePoll('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deletePoll', async () => {
      await expect(service.DeletePoll('')).rejects.toThrow();
    });
  });
  describe('Vote', () => {
    it('should vote poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.Vote('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.Vote('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during vote', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.Vote('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for vote', async () => {
      await expect(service.Vote('')).rejects.toThrow();
    });
  });
  describe('GetResults', () => {
    it('should getResults poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetResults('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetResults('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getResults', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetResults('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getResults', async () => {
      await expect(service.GetResults('')).rejects.toThrow();
    });
  });
  describe('GetPollStats', () => {
    it('should getPollStats poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPollStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPollStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPollStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPollStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPollStats', async () => {
      await expect(service.GetPollStats('')).rejects.toThrow();
    });
  });
  describe('ClosePoll', () => {
    it('should closePoll poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ClosePoll('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ClosePoll('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during closePoll', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ClosePoll('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for closePoll', async () => {
      await expect(service.ClosePoll('')).rejects.toThrow();
    });
  });
  describe('ReopenPoll', () => {
    it('should reopenPoll poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.ReopenPoll('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.ReopenPoll('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during reopenPoll', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.ReopenPoll('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for reopenPoll', async () => {
      await expect(service.ReopenPoll('')).rejects.toThrow();
    });
  });
  describe('GetPollHistory', () => {
    it('should getPollHistory poll successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetPollHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when poll not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetPollHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getPollHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetPollHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getPollHistory', async () => {
      await expect(service.GetPollHistory('')).rejects.toThrow();
    });
  });

});
