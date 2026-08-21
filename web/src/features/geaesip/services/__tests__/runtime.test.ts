import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipRuntimeService } from '../runtime.service';

const mockRuntimeRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockExecutionRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockMetricRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const RUNTIME_ID = '660e8400-e29b-41d4-a716-446655440001';
const EXEC_ID = '770e8400-e29b-41d4-a716-446655440002';
const METRIC_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockRuntime = {
  id: RUNTIME_ID,
  school_id: SCHOOL_ID,
  name: 'Analytics Runtime',
  status: 'running',
  config: { maxConcurrency: 5 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  lastRunAt: new Date().toISOString(),
};

const mockExecution = {
  id: EXEC_ID,
  school_id: SCHOOL_ID,
  runtimeId: RUNTIME_ID,
  status: 'completed',
  output: { processed: 100 },
  timestamp: new Date().toISOString(),
};

const mockMetric = {
  id: METRIC_ID,
  school_id: SCHOOL_ID,
  runtimeId: RUNTIME_ID,
  name: 'cpu_usage',
  value: 0.65,
  unit: 'ratio',
  timestamp: new Date().toISOString(),
};

let service: GeaesipRuntimeService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipRuntimeService(
    mockRuntimeRepo as never,
    mockExecutionRepo as never,
    mockMetricRepo as never,
  );
});

describe('GeaesipRuntimeService', () => {
  describe('listRuntimes', () => {
    it('should list runtimes for a school', async () => {
      mockRuntimeRepo.findAllBySchool.mockResolvedValue([mockRuntime]);
      const result = await service.listRuntimes(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listRuntimes('')).rejects.toThrow();
    });
  });

  describe('getRuntime', () => {
    it('should retrieve a runtime by id', async () => {
      mockRuntimeRepo.findById.mockResolvedValue(mockRuntime);
      const result = await service.getRuntime(SCHOOL_ID, RUNTIME_ID);
      expect(result).toEqual(mockRuntime);
    });

    it('should throw if runtime not found', async () => {
      mockRuntimeRepo.findById.mockImplementation(() => { throw new Error('Not found'); });
      await expect(service.getRuntime(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createRuntime', () => {
    it('should create a runtime successfully', async () => {
      mockRuntimeRepo.create.mockResolvedValue(mockRuntime);
      const result = await service.createRuntime(SCHOOL_ID, {
        school_id: SCHOOL_ID, name: 'Analytics Runtime', status: 'running',
        config: { maxConcurrency: 5 },
      } as never);
      expect(result).toEqual(mockRuntime);
    });
  });

  describe('updateRuntime', () => {
    it('should update a runtime', async () => {
      mockRuntimeRepo.findById.mockResolvedValue(mockRuntime);
      mockRuntimeRepo.update.mockResolvedValue({ ...mockRuntime, name: 'Updated' });
      const result = await service.updateRuntime(SCHOOL_ID, RUNTIME_ID, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });
  });

  describe('startRuntime', () => {
    it('should start a runtime', async () => {
      mockRuntimeRepo.findById.mockResolvedValue({ ...mockRuntime, status: 'stopped' });
      mockRuntimeRepo.update.mockResolvedValue({ ...mockRuntime, status: 'running' });
      const result = await service.startRuntime(SCHOOL_ID, RUNTIME_ID);
      expect(result.status).toBe('running');
    });
  });

  describe('stopRuntime', () => {
    it('should stop a runtime', async () => {
      mockRuntimeRepo.findById.mockResolvedValue(mockRuntime);
      mockRuntimeRepo.update.mockResolvedValue({ ...mockRuntime, status: 'stopped' });
      const result = await service.stopRuntime(SCHOOL_ID, RUNTIME_ID);
      expect(result.status).toBe('stopped');
    });
  });

  describe('deleteRuntime', () => {
    it('should delete a runtime', async () => {
      mockRuntimeRepo.findById.mockResolvedValue(mockRuntime);
      mockRuntimeRepo.delete.mockResolvedValue(undefined);
      await service.deleteRuntime(SCHOOL_ID, RUNTIME_ID);
      expect(mockRuntimeRepo.delete).toHaveBeenCalledWith(RUNTIME_ID);
    });
  });

  describe('listExecutions', () => {
    it('should list executions', async () => {
      mockExecutionRepo.findAllBySchool.mockResolvedValue([mockExecution]);
      const result = await service.listExecutions(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('getExecution', () => {
    it('should retrieve an execution by id', async () => {
      mockExecutionRepo.findById.mockResolvedValue(mockExecution);
      const result = await service.getExecution(SCHOOL_ID, EXEC_ID);
      expect(result).toEqual(mockExecution);
    });
  });

  describe('listMetrics', () => {
    it('should list runtime metrics', async () => {
      mockMetricRepo.findAllBySchool.mockResolvedValue([mockMetric]);
      const result = await service.listMetrics(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('getMetric', () => {
    it('should retrieve a metric by id', async () => {
      mockMetricRepo.findById.mockResolvedValue(mockMetric);
      const result = await service.getMetric(SCHOOL_ID, METRIC_ID);
      expect(result).toEqual(mockMetric);
    });
  });

  describe('getRuntimeStats', () => {
    it('should return stats', async () => {
      mockRuntimeRepo.findAllBySchool.mockResolvedValue([mockRuntime]);
      mockExecutionRepo.findAllBySchool.mockResolvedValue([mockExecution]);
      mockMetricRepo.findAllBySchool.mockResolvedValue([mockMetric]);
      const result = await service.getRuntimeStats(SCHOOL_ID);
      expect(result.totalRuntimes).toBe(1);
      expect(result.runningRuntimes).toBe(1);
      expect(result.totalExecutions).toBe(1);
      expect(result.totalMetrics).toBe(1);
    });
  });
});
