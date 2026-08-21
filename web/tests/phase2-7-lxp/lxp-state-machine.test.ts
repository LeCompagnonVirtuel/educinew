import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpStateMachineService } from '@/features/lxp/services/lxp-state-machine.service';

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

describe('LxpStateMachineService', () => {
  let service: LxpStateMachineService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpStateMachineService(mockSupabase as never);
  });

  describe('GetStateMachine', () => {
    it('should getStateMachine state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetStateMachine('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetStateMachine('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getStateMachine', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetStateMachine('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getStateMachine', async () => {
      await expect(service.GetStateMachine('')).rejects.toThrow();
    });
  });
  describe('CreateStateMachine', () => {
    it('should createStateMachine state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateStateMachine('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateStateMachine('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createStateMachine', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateStateMachine('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createStateMachine', async () => {
      await expect(service.CreateStateMachine('')).rejects.toThrow();
    });
  });
  describe('UpdateStateMachine', () => {
    it('should updateStateMachine state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateStateMachine('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateStateMachine('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateStateMachine', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateStateMachine('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateStateMachine', async () => {
      await expect(service.UpdateStateMachine('')).rejects.toThrow();
    });
  });
  describe('DeleteStateMachine', () => {
    it('should deleteStateMachine state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteStateMachine('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteStateMachine('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteStateMachine', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteStateMachine('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteStateMachine', async () => {
      await expect(service.DeleteStateMachine('')).rejects.toThrow();
    });
  });
  describe('TransitionState', () => {
    it('should transitionState state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.TransitionState('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.TransitionState('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during transitionState', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.TransitionState('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for transitionState', async () => {
      await expect(service.TransitionState('')).rejects.toThrow();
    });
  });
  describe('GetStateMachineStatus', () => {
    it('should getStateMachineStatus state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetStateMachineStatus('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetStateMachineStatus('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getStateMachineStatus', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetStateMachineStatus('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getStateMachineStatus', async () => {
      await expect(service.GetStateMachineStatus('')).rejects.toThrow();
    });
  });
  describe('GetStateMachineHistory', () => {
    it('should getStateMachineHistory state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetStateMachineHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetStateMachineHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getStateMachineHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetStateMachineHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getStateMachineHistory', async () => {
      await expect(service.GetStateMachineHistory('')).rejects.toThrow();
    });
  });
  describe('GetStateMachineStats', () => {
    it('should getStateMachineStats state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetStateMachineStats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetStateMachineStats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getStateMachineStats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetStateMachineStats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getStateMachineStats', async () => {
      await expect(service.GetStateMachineStats('')).rejects.toThrow();
    });
  });
  describe('GetStateMachineConfig', () => {
    it('should getStateMachineConfig state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetStateMachineConfig('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetStateMachineConfig('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getStateMachineConfig', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetStateMachineConfig('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getStateMachineConfig', async () => {
      await expect(service.GetStateMachineConfig('')).rejects.toThrow();
    });
  });
  describe('GetStateMachineTransitions', () => {
    it('should getStateMachineTransitions state machine successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetStateMachineTransitions('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when state machine not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetStateMachineTransitions('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getStateMachineTransitions', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetStateMachineTransitions('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getStateMachineTransitions', async () => {
      await expect(service.GetStateMachineTransitions('')).rejects.toThrow();
    });
  });

});
